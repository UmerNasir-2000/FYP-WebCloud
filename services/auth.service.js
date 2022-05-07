const bcrypt = require("bcryptjs");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { users } = require("../models");
const { Op } = require("sequelize");

const registerUserService = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hasUser = await validateUser(req.body);

  if (hasUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Email Already Exists." });
  }

  // const salt = await bcrypt.genSalt(10);
  // const hash = await bcrypt.hash(password, salt);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await users.create({
    first_name: firstName,
    last_name: lastName,
    email,
    password: hash,
  });

  const transformedResponse = {
    id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    email,
  };

  res
    .status(StatusCodes.OK)
    .json({ message: "Register User API", user: transformedResponse });
});

const validateUser = async (body) => {
  const { email } = body;

  const existingUser = await users.findOne({ where: { email: email } });

  return existingUser ? true : false;
};

const loginUserService = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const validUser = await users.findOne({
    where: {
      email: email,
      status: {
        [Op.ne]: "Deleted",
      },
    },
  });

  if (!validUser)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User does not exist" });

  const correctPassword = await bcrypt.compare(password, validUser.password);

  //const correctPassword = await argon2.verify(validUser.password, password);

  console.log("validUser.password", validUser.password);
  console.log("correctPassword :>> ", correctPassword);

  if (correctPassword) {
    const accessToken = generateToken(validUser.id);
    return res.status(StatusCodes.ACCEPTED).json({
      message: "Login Successful",
      accessToken,
      user: {
        id: validUser.id,
        email: validUser.email,
        first_name: validUser.first_name,
        last_name: validUser.last_name,
        username: `${validUser.first_name.toLowerCase()}.${validUser.last_name.toLowerCase()}`,
        profile_picture_url: validUser.profile_picture_url,
        is_admin: validUser.is_admin,
        status: validUser.status,
      },
    });
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Invalid Credentials Provided." });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

module.exports = { registerUserService, loginUserService };
