const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const { projects, users, repositories, Sequelize } = require("../models");
const db = require("../models");
const { Op } = require("sequelize");

const getPublicRepositoriesService = asyncHandler(async (req, res) => {
  let publicRepos = await projects.findAll({
    where: {
      is_public: true,
      id: {
        [Op.ne]: req.user.id,
      },
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

  if (repoCount && repoCount[0].dataValues.total_repositories > 3) {
    return res.status(StatusCodes.BAD_REQUEST).json({
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

const getUsersForRepoService = asyncHandler(async (req, res) => {
  const project = await projects.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!project) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid Project Id" });
  }

  const users = await db.sequelize.query(
    `CALL sql_web_cloud.users_forked_repo($projectId);`,
    {
      bind: { projectId: req.params.id },
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ message: "Get List of Users Who Forked A Project", users });
});

const likeRepoService = asyncHandler(async (req, res) => {
  const updatedProject = await projects.update(
    { likes: db.sequelize.literal(`likes + 1`) },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  const currentLikes = await projects.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["likes"],
  });

  res
    .status(StatusCodes.OK)
    .json({ message: `Like for Repo = ${req.params.id}`, currentLikes });
});

const getPublicRepositoryByIdService = asyncHandler(async (req, res) => {
  let publicRepo = await projects.findOne({
    where: {
      is_public: true,
      id: req.params.id,
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

  res.status(StatusCodes.OK).json({
    message: `Fetch Public Repository Id = ${req.params.id}`,
    publicRepo,
  });
});

const getUserForkedProjectsService = asyncHandler(async (req, res) => {
  const forkedProjects = await db.sequelize.query(
    `CALL sql_web_cloud.users_forked_repos($userId);`,
    {
      bind: { userId: req.user.id },
    }
  );
  res.status(StatusCodes.OK).json({
    message: `Fetch Current User's Forked Project`,
    forkedProjects,
  });
});

module.exports = {
  getPublicRepositoriesService,
  getAllRepositoriesService,
  forkRepositoryService,
  getUsersForRepoService,
  likeRepoService,
  getPublicRepositoryByIdService,
  getUserForkedProjectsService,
};
