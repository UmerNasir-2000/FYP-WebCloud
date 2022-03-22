const { createProjectTemplate } = require("../services/project.service");

/**
 *   @desc    POST Register User on Web Cloud
 *   @route   POST /api/project/create-template
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

const createUserProjectTemplate = async (req, res) => {
  await createProjectTemplate(req, res);
};

module.exports = { createUserProjectTemplate };
