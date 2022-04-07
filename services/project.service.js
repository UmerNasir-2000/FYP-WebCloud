const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const {
  projects,
  configurations,
  repositories,
  requests,
} = require("../models");

const createProjectTemplate = asyncHandler(async (req, res) => {
  const {
    project_name,
    project_description,
    is_public,
    web_framework,
    database,
  } = req.body;

  const ifExists = await projects.findOne({
    where: {
      project_name,
    },
  });

  if (ifExists)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Project Name Already Exists" });

  const project = await projects.create({
    project_name: project_name,
    path: "users/web/project/",
    description: project_description,
    is_public: is_public,
    user_id: req.user.id,
  });

  const projectConfig = await configurations.create({
    db_port: 3306,
    web_port: 3000,
    database,
    web_framework,
    project_id: project.id,
  });

  const projectRequest = await requests.create({ project_id: project.id });

  // const repo = await repositories.create({
  //   userId: req.user.id,
  //   projectId: project.id,
  // });

  let createdProjectResponse = {
    project_name,
    project_status: projectRequest.status,
  };

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Project Successfully Created", createdProjectResponse });
});

const getUserProjectsService = asyncHandler(async (req, res) => {
  const userProjects = await projects.findAll({
    where: {
      user_id: req.user.id,
    },
    include: {
      model: configurations,
      required: true,
      attributes: {
        exclude: ["id", "project_id", "createdAt"],
      },
    },
    attributes: {
      exclude: ["user_id"],
    },
  });

  if (userProjects.length === 0)
    return res
      .status(StatusCodes.OK)
      .json({ message: "No projects for logged in user." });

  res
    .status(StatusCodes.OK)
    .json({ message: "User's Own Projects", userProjects });
});

module.exports = { createProjectTemplate, getUserProjectsService };
