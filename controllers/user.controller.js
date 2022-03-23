const { getUsersService } = require("../services/user.service");

/**
 *   @desc    View all users for Admin user.
 *   @route   GET /api/users/
 *   @access  PRIVATE [ADMIN]
 *   @author  UMER NASIR
 **/

const getUsers = async (req, res) => {
  await getUsersService(req, res);
};

module.exports = { getUsers };
