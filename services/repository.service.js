const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const { projects, users, repositories } = require("../models");

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

module.exports = { getPublicRepositoriesService };
