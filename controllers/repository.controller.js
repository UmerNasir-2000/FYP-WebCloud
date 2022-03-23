const {
  getPublicRepositoriesService,
  getAllRepositoriesService,
} = require("../services/repository.service");

/**
 *   @desc    GET Fetch all public repositories
 *   @route   GET /api/repository/public
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const getPublicRepositories = async (req, res) => {
  await getPublicRepositoriesService(req, res);
};

/**
 *   @desc    GET Fetch All Repositories
 *   @route   GET /api/repository/
 *   @access  PRIVATE [ADMIN]
 *   @author  UMER NASIR
 **/

const getAllRepositories = async (req, res) => {
  await getAllRepositoriesService(req, res);
};

module.exports = { getPublicRepositories, getAllRepositories };