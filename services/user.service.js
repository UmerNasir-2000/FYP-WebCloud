const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { users, notifications } = require("../models");
const db = require("../models");

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

const getUserByIdService = asyncHandler(async (req, res) => {
  let ifUser = await users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (ifUser) {
    let projectDetails = await db.sequelize.query(
      `CALL sql_web_cloud.admin_view_user_id($userId) `,
      {
        bind: { userId: req.params.id },
      }
    );
    return res.status(StatusCodes.OK).json({
      message: `View User With Id = ${req.params.id}`,
      ifUser,
      projectDetails,
    });
  }

  res.status(StatusCodes.NOT_FOUND).json({
    message: `View User With Id = ${req.params.id} Does Not Exist`,
  });
});

const getUserNotificationsService = asyncHandler(async (req, res) => {
  const userNotifications = await notifications.findAll({
    where: {
      user_id: req.user.id,
    },
  });
  let foundUser = "";
  if (userNotifications) {
    foundUser = await users.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["password", "is_admin", "status", "has_subscription"],
      },
    });
  }
  res.status(StatusCodes.OK).json({
    message: `User Notifications`,
    userNotifications,
    foundUser,
  });
});

module.exports = {
  getUsersService,
  getUserByIdService,
  getUserNotificationsService,
};
