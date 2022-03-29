const {
  getPublicRepositoriesService,
  getAllRepositoriesService,
  forkRepositoryService,
  getUsersForRepoService,
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

/**
 *   @desc    POST Fork Repositories
 *   @route   POST /api/repository/fork
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const forkRepository = async (req, res) => {
  await forkRepositoryService(req, res);
};

/**
 *   @desc    GET Fork Repositories
 *   @route   GET /api/repository/projects/{id}
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const getUsersForProject = async (req, res) => {
  await getUsersForRepoService(req, res);
};

module.exports = {
  getPublicRepositories,
  getAllRepositories,
  forkRepository,
  getUsersForProject,
};
