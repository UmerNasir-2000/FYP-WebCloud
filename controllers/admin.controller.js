const { dashboardService } = require("../services/admin.service");

/**
 *   @desc    GET Dashboard for Admin
 *   @route   GET /api/admin/dashboard
 *   @access  PRIVATE [Admin]
 *   @author  UMER NASIR
 **/

const dashboard = async (req, res) => {
  await dashboardService(req, res);
};

module.exports = { dashboard };
