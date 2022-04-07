const {
  dashboardService,
  updateProjectStatusService,
  chartsService,
  getRequestsService,
  dashboardRequestsService,
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
 *   @desc    GET Dashboard Requests for Admin
 *   @route   GET /api/admin/dashboard-requests
 *   @access  PRIVATE [Admin]
 *   @author  UMER NASIR
 **/

const dashboardRequests = async (req, res) => {
  await dashboardRequestsService(req, res);
};

/**
 *   @desc    GET Dashboard Parameter for Admin
 *   @route   GET /api/admin/charts
 *   @access  PRIVATE [Admin]
 *   @author  UMER NASIR
 **/

const charts = async (req, res) => {
  await chartsService(req, res);
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

/**
 *   @desc    GET Fetch All Admin Requests
 *   @route   GET /api/admin/requests
 *   @access  PRIVATE [Admin]
 *   @author  UMER NASIR
 **/

const getRequests = async (req, res) => {
  await getRequestsService(req, res);
};

module.exports = {
  dashboard,
  updateProjectStatus,
  charts,
  getRequests,
  dashboardRequests,
};
