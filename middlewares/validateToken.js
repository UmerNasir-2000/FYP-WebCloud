const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { users } = require("../models");
const { StatusCodes } = require("http-status-codes");

const validateToken = asyncHandler(async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const currentUser = await users.findOne({
        where: { id: decodedToken.id },
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "is_admin",
          "status",
          "has_subscription",
          "profile_picture_url",
          "port",
          "container",
        ],
      });

      req.user = {};
      req.user.id = currentUser.dataValues.id;
      req.user.first_name = currentUser.dataValues.first_name;
      req.user.last_name = currentUser.dataValues.last_name;
      req.user.email = currentUser.dataValues.email;
      req.user.status = currentUser.dataValues.status;
      req.user.has_subscription = currentUser.dataValues.has_subscription;
      req.user.profile_picture_url = currentUser.dataValues.profile_picture_url;
      req.user.container = currentUser.dataValues.container;
      req.user.port = currentUser.dataValues.port;

      next();
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    if (!token) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized, No Token Provided." });
    }
  }
});

module.exports = validateToken;
