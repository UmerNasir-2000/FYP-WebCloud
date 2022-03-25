const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const validateAdmin = require("../middlewares/validateAdmin");
const validateResource = require("../middlewares/validateRequest");
const parameterSchema = require("../schemas/admin/admin-chart.schema");
const updateProjectStatusSchema = require("../schemas/request/update-project-status.schema");
const {
  dashboard,
  updateProjectStatus,
  charts,
} = require("../controllers/admin.controller");

router.route("/dashboard").get(validateToken, validateAdmin, dashboard);

router
  .route("/charts")
  .get(validateToken, validateAdmin, validateResource(parameterSchema), charts);

router
  .route("/request/:id")
  .put(
    validateToken,
    validateAdmin,
    validateResource(updateProjectStatusSchema),
    updateProjectStatus
  );

module.exports = router;
