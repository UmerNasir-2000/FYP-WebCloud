const {
  createProjectTemplate,
  getUserProjectsService,
  getUserProjectByIdService,
  getUserForkedProjectsService,
} = require("../services/project.service");

/**
 *   @desc    POST Register User on Web Cloud
 *   @route   POST /api/project/create-template
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const createUserProjectTemplate = async (req, res) => {
  await createProjectTemplate(req, res);
};

/**
 *   @desc    GET Fetch User's Own Projects
 *   @route   GET /api/project/user/
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const getUserProjects = async (req, res) => {
  await getUserProjectsService(req, res);
};

/**
 *   @desc    GET Fetch User's Own Project By Id
 *   @route   GET /api/project/user/{id}
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const getUserProjectById = async (req, res) => {
  await getUserProjectByIdService(req, res);
};

/**
 *   @desc    GET Fetch User's Forked Projects By For Logged In User
 *   @route   GET /api/project/forked-projects
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const getUserForkedProjects = async (req, res) => {
  await getUserForkedProjectsService(req, res);
};

module.exports = {
  createUserProjectTemplate,
  getUserProjects,
  getUserProjectById,
  getUserForkedProjects,
};
