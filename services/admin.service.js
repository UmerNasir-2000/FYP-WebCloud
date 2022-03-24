const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { users, projects, requests, Sequelize } = require("../models");
const db = require("../models");
const sequelize = require("sequelize");

const dashboardService = asyncHandler(async (req, res) => {
  const userCount = await users.findAll({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "total_users"]],
  });

  const projectCount = await projects.findAll({
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("id")), "total_projects"],
    ],
  });

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

module.exports = { dashboardService, updateProjectStatusService };
