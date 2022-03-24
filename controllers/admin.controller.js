const {
  dashboardService,
  updateProjectStatusService,
} = require("../services/admin.service");

/**
 *   @desc    GET Dashboard for Admin
 *   @route   GET /api/admin/dashboard
 *   @access  PRIVATE [Admin]
 *   @author  UMER NASIR
 **/

const dashboard = async (req, res) => {
  await dashboardService(req, res);
};

/**
 *   @desc    PUT Update Project Status
 *   @route   PUT /api/admin/dashboard
 *   @access  PRIVATE [Admin]
 *   @author  UMER NASIR
 **/

const updateProjectStatus = async (req, res) => {
  await updateProjectStatusService(req, res);
};

module.exports = { dashboard, updateProjectStatus };
