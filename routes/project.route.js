const express = require("express");
const router = express.Router();
const validateResource = require("../middlewares/validateRequest");
const validateToken = require("../middlewares/validateToken");
const validateAdmin = require("../middlewares/validateAdmin");
const createProjectSchema = require("../schemas/project/create-project-template.schema");
const {
  createUserProjectTemplate,
  getUserProjects,
  getUserProjectById,
} = require("../controllers/project.controller");

router.route("/user/:id").get(validateToken, getUserProjectById);

router.route("/user").get(validateToken, getUserProjects);

router
  .route("/create-template")
  .post(
    validateToken,
    validateResource(createProjectSchema),
    createUserProjectTemplate
  );

module.exports = router;
