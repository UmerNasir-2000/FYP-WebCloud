const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const { projects, users, repositories, Sequelize } = require("../models");

const getPublicRepositoriesService = asyncHandler(async (req, res) => {
  let publicRepos = await projects.findAll({
    where: {
      is_public: true,
    },
    include: {
      model: users,
      required: true,
      where: {
        status: "Enable",
      },
      attributes: {
        exclude: ["password", "is_admin", "status", "has_subscription"],
      },
    },

    attributes: {
      exclude: ["path", "user_id", "is_public"],
    },
  });

  res
    .status(StatusCodes.OK)
    .json({ message: "Fetch All Public Repositories", publicRepos });
});

const getAllRepositoriesService = asyncHandler(async (req, res) => {
  const repos = await projects.findAll({
    include: {
      model: users,
      required: true,
      where: {
        status: "Enable",
      },
      attributes: {
        exclude: ["password", "is_admin", "status", "has_subscription"],
      },
    },

    attributes: {
      exclude: ["path", "user_id"],
    },
  });

  res.status(StatusCodes.OK).json({ message: "Fetch All Repositories", repos });
});

const forkRepositoryService = asyncHandler(async (req, res) => {
  const { project_id } = req.body;

  const project = await projects.findOne({
    where: {
      id: project_id,
    },
  });

  const projRepo = await repositories.findOne({
    where: {
      userId: req.user.id,
      projectId: project_id,
    },
  });

  if (!project || projRepo) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid Project Id" });
  }

  const repoCount = await repositories.findAll({
    where: {
      userId: req.user.id,
    },
    attributes: [
      "userId",
      [Sequelize.fn("COUNT", Sequelize.col("userId")), `total_repositories`],
    ],
    group: ["userId"],
  });

  if (repoCount[0].dataValues.total_repositories > 3) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        message: "Can't fork more than 3 repositories. Require Subscription",
      });
  }

  if (project) {
    const repo = await repositories.create({
      userId: req.user.id,
      projectId: project_id,
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Fork Repository API", repo });
  }

  res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Project Id" });
});

module.exports = {
  getPublicRepositoriesService,
  getAllRepositoriesService,
  forkRepositoryService,
};
