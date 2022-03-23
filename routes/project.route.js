const express = require("express");
const router = express.Router();
const validateResource = require("../middlewares/validateRequest");
const validateToken = require("../middlewares/validateToken");
const createProjectSchema = require("../schemas/project/create-project-template.schema");
const {
  createUserProjectTemplate,
  getUserProjects,
} = require("../controllers/project.controller");

router.route("/user").get(validateToken, getUserProjects);

router
  .route("/create-template")
  .post(
    validateToken,
    validateResource(createProjectSchema),
    createUserProjectTemplate
  );

module.exports = router;
