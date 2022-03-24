const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const validateAdmin = require("../middlewares/validateAdmin");
const validateResource = require("../middlewares/validateRequest");
const updateProjectStatusSchema = require("../schemas/request/update-project-status.schema");
const {
  dashboard,
  updateProjectStatus,
} = require("../controllers/admin.controller");

router.route("/dashboard").get(validateToken, validateAdmin, dashboard);
router
  .route("/request/:id")
  .put(
    validateToken,
    validateAdmin,
    validateResource(updateProjectStatusSchema),
    updateProjectStatus
  );

module.exports = router;
