const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const validateAdmin = require("../middlewares/validateAdmin");
const validateResource = require("../middlewares/validateRequest");
const parameterSchema = require("../schemas/admin/admin-chart.schema");
const updateUserStatusSchema = require("../schemas/admin/update-user-status.schema");
const updateProjectStatusSchema = require("../schemas/request/update-project-status.schema");
const {
  dashboard,
  updateProjectStatus,
  charts,
  getRequests,
  dashboardRequests,
  updateUserStatus,
} = require("../controllers/admin.controller");
const logDatabase = require("../middlewares/logDatabase");

router
  .route("/dashboard")
  .get(validateToken, validateAdmin, logDatabase, dashboard);

router
  .route("/charts")
  .post(
    validateToken,
    validateAdmin,
    validateResource(parameterSchema),
    logDatabase,
    charts
  );

router
  .route("/requests")
  .get(validateToken, validateAdmin, logDatabase, getRequests);

router
  .route("/dashboard-requests")
  .get(validateToken, validateAdmin, logDatabase, dashboardRequests);

router
  .route("/user-status/:id")
  .put(
    validateToken,
    validateAdmin,
    validateResource(updateUserStatusSchema),
    logDatabase,
    updateUserStatus
  );

router
  .route("/request/:id")
  .put(
    validateToken,
    validateAdmin,
    validateResource(updateProjectStatusSchema),
    logDatabase,
    updateProjectStatus
  );

module.exports = router;
