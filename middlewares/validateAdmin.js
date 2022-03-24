const { StatusCodes } = require("http-status-codes");
const { users } = require("../models");

const validateAdmin = async (req, res, next) => {
  const isAdminUser = await users.findOne({
    where: {
      id: req.user.id,
      is_admin: true,
    },
  });

  if (isAdminUser == null) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Only Admin User Can Perform This Action" });
  }

  next();
};

module.exports = validateAdmin;
