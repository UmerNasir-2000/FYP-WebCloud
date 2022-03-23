const {
  getPublicRepositoriesService,
} = require("../services/repository.service");

/**
 *   @desc    GET Fetch all public repositories
 *   @route   GET /api/repository/
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const getPublicRepositories = async (req, res) => {
  await getPublicRepositoriesService(req, res);
};

module.exports = { getPublicRepositories };
