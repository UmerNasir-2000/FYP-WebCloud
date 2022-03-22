const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { users, projects } = require("../models");

const createProjectTemplate = asyncHandler(async (req, res) => {
  const { project_name, project_description, is_public } = req.body;

  try {
    const project = await projects.create({
      project_name: project_name,
      path: "users/web/project/",
      description: project_description,
      is_public: is_public,
      user_id: req.user.id,
    });

    console.log(project);
  } catch (error) {
    console.log(error);
  }

  res.status(StatusCodes.CREATED).json({ message: "Working", user_id: 1 });
});

module.exports = { createProjectTemplate };
