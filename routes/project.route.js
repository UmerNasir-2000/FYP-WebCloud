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
const logDatabase = require("../middlewares/logDatabase");

router.route("/user/:id").get(validateToken, logDatabase, getUserProjectById);

router.route("/user").get(validateToken, logDatabase, getUserProjects);

router
  .route("/create-template")
  .post(
    validateToken,
    validateResource(createProjectSchema),
    logDatabase,
    createUserProjectTemplate
  );

module.exports = router;
