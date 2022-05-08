const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const {
  projects,
  users,
  repositories,
  notifications,
  Sequelize,
} = require("../models");
const db = require("../models");
const { Op } = require("sequelize");

const getPublicRepositoriesService = asyncHandler(async (req, res) => {
  let publicRepos = await db.sequelize.query(
    "CALL sql_web_cloud.public_repos($userId)",
    {
      bind: { userId: req.user.id },
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ message: "Fetch All Public Repositories", publicRepos });
});

const getTrendingPublicRepositoriesService = asyncHandler(async (req, res) => {
  let trendingPublicRepos = await db.sequelize.query(
    `CALL sql_web_cloud.trending_projects() `
  );
  res.status(StatusCodes.OK).json({
    message: "Fetch Trending Public Repositories",
    trendingPublicRepos,
  });
});

const getUserRecentProjectService = asyncHandler(async (req, res) => {
  let userRecentRepos = await db.sequelize.query(
    `CALL sql_web_cloud.recent_user_projects($userId) `,
    {
      bind: { userId: req.user.id },
    }
  );
  res.status(StatusCodes.OK).json({
    message: "Fetch Recent User Projects",
    userRecentRepos,
  });
});

const getAllRepositoriesService = asyncHandler(async (req, res) => {
  let repositories = await db.sequelize.query(
    `CALL sql_web_cloud.get_all_repositories() `
  );

  res
    .status(StatusCodes.OK)
    .json({ message: "Fetch All Repositories", repositories });
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

  if (repoCount && repoCount[0]?.dataValues.total_repositories > 3) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Can't fork more than 4 repositories. Require Subscription",
    });
  }

  if (project) {
    const repo = await repositories.create({
      userId: req.user.id,
      projectId: project_id,
    });

    const notification = await notifications.create({
      text: `User With Email ${req.user.email} Forked Your Project Named ${project.project_name}`,
      user_id: project.user_id,
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Fork Repository API", repo, notification });
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
  const repoDetail = await db.sequelize.query(
    "CALL sql_web_cloud.get_repo_detail_by_id($id)",
    {
      bind: { id: req.params.id },
    }
  );

  res.status(StatusCodes.OK).json({
    message: `Fetch Public Repository Id = ${req.params.id}`,
    repoDetail,
  });
});

const getUserForkedProjectsService = asyncHandler(async (req, res) => {
  const forkedProjects = await db.sequelize.query(
    `CALL sql_web_cloud.users_forked_repo($userId);`,
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
  getTrendingPublicRepositoriesService,
  getUserRecentProjectService,
};
