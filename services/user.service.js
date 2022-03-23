const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { users } = require("../models");

const getUsersService = asyncHandler(async (req, res) => {
  const existingUsers = await users.findAll({
    where: {
      is_admin: 0,
    },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "email",
      "has_subscription",
      "profile_picture_url",
      "status",
    ],
  });

  if (existingUsers.length === 0)
    return res.status(StatusCodes.OK).json({ message: "No users registered." });

  res.status(StatusCodes.OK).json({
    message: "View All Users",
    existingUsers,
    totalUsers: existingUsers.length,
  });
});

module.exports = { getUsersService };
