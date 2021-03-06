const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const {
  users,
  projects,
  requests,
  configurations,
  Sequelize,
} = require("../models");
const db = require("../models");

const dashboardService = asyncHandler(async (req, res) => {
  const userCount = await users.findAll({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "total_users"]],
  });

  const projectCount = await projects.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "total_projects"],
    ],
  });

  const pendingProjectsCount = await db.sequelize.query(
    `CALL sql_web_cloud.total_pending_projects()`
  );

  console.log(pendingProjectsCount);

  const totalUsers = userCount[0].dataValues.total_users;
  const totalProjects = projectCount[0].dataValues.total_projects;

  const requests = await db.sequelize.query(
    "CALL sql_web_cloud.admin_dashboard()"
  );

  res.status(StatusCodes.OK).json({
    message: "Admin Dashboard API",
    projectTemplates: 4,
    requests,
    totalUsers,
    totalProjects,
    pendingProjectsCount,
  });
});

const dashboardRequestsService = asyncHandler(async (req, res) => {
  const requests = await db.sequelize.query(
    "CALL sql_web_cloud.admin_dashboard()"
  );

  res.status(StatusCodes.OK).json({
    message: "Admin Requests Dashboard API",
    requests,
  });
});

const updateProjectStatusService = asyncHandler(async (req, res) => {
  const updatedRequest = await requests.update(
    { status: req.body.project_status },
    {
      where: {
        project_id: req.params.id,
      },
    }
  );
  res.status(StatusCodes.ACCEPTED).json({ message: "Update Project Status" });
});

const chartsService = asyncHandler(async (req, res) => {
  const { entity } = req.body;

  const configuration = await configurations.findAll({
    attributes: [
      entity,
      [Sequelize.fn("COUNT", Sequelize.col(entity)), `total_${entity}`],
    ],
    group: [entity],
  });

  res
    .status(StatusCodes.OK)
    .json({ message: "Admin Dashboard Charts", configuration });
});

const getRequestsService = asyncHandler(async (req, res) => {
  const allRequests = await db.sequelize.query(
    "CALL sql_web_cloud.admin_requests()"
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "Admin Requests API", allRequests });
});

const updateUserStatusService = asyncHandler(async (req, res) => {
  const ifUser = await users.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "email", "status"],
  });

  if (!ifUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: `User with id = ${req.params.id} does not exist`,
    });
  }
  const updatedUser = await users.update(
    { status: req.body.user_status },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(StatusCodes.OK).json({
    message: `Update User Status API = ${req.params.id}`,
    ifUser,
  });
});

module.exports = {
  dashboardService,
  updateProjectStatusService,
  chartsService,
  getRequestsService,
  dashboardRequestsService,
  updateUserStatusService,
};
