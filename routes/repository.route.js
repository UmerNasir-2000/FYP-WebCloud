const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const validateResource = require("../middlewares/validateRequest");
const forkRepositorySchema = require("../schemas/repository/fork-repository.schema");
const {
  getPublicRepositories,
  getAllRepositories,
  forkRepository,
  getUsersForProject,
  likeRepo,
  getPublicRepositoryById,
  getUserForkedProjects,
  getTrendingPublicRepositories,
  getUserRecentProject,
} = require("../controllers/repository.controller");
const logDatabase = require("../middlewares/logDatabase");

router.route("/public").get(validateToken, logDatabase, getPublicRepositories);

router
  .route("/trending")
  .get(validateToken, logDatabase, getTrendingPublicRepositories);

router
  .route("/recent/projects")
  .get(validateToken, logDatabase, getUserRecentProject);

router
  .route("/projects")
  .get(validateToken, logDatabase, getUserForkedProjects);

router.route("/").get(validateToken, logDatabase, getAllRepositories);
router.route("/:id").get(validateToken, logDatabase, getPublicRepositoryById);

router
  .route("/fork")
  .post(
    validateToken,
    validateResource(forkRepositorySchema),
    logDatabase,
    forkRepository
  );

router.route("/like/:id").post(validateToken, logDatabase, likeRepo);

router
  .route("/project/:id")
  .get(validateToken, logDatabase, getUsersForProject);

module.exports = router;
