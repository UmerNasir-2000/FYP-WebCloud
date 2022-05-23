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

      req.user = await users.findOne({
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
