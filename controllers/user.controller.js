const {
  getUsersService,
  getUserByIdService,
} = require("../services/user.service");

/**
 *   @desc    View all users for Admin user.
 *   @route   GET /api/users/
 *   @access  PRIVATE [ADMIN]
 *   @author  UMER NASIR
 **/

const getUsers = async (req, res) => {
  await getUsersService(req, res);
};

/**
 *   @desc    View specific user for Admin user.
 *   @route   GET /api/users/:id
 *   @access  PRIVATE [ADMIN]
 *   @author  UMER NASIR
 **/

const getUserById = async (req, res) => {
  await getUserByIdService(req, res);
};

module.exports = { getUsers, getUserById };
