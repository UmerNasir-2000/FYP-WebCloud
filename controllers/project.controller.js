const {
  createProjectTemplate,
  getUserProjectsService,
  getUserProjectByIdService,
  getUserForkedProjectsService,
  startProjectService,
  exitProjectService,
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

/**
 *   @desc    GET Start The Project
 *   @route   GET /api/project/start
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const startProject = async (req, res) => {
  await startProjectService(req, res);
};

/**
 *   @desc    GET Exit The Project
 *   @route   GET /api/project/exit
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const exitProject = async (req, res) => {
  await exitProjectService(req, res);
};

module.exports = {
  createUserProjectTemplate,
  getUserProjects,
  getUserProjectById,
  getUserForkedProjects,
  startProject,
  exitProject,
};
