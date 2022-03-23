const {
  createProjectTemplate,
  getUserProjectsService,
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

module.exports = { createUserProjectTemplate, getUserProjects };
