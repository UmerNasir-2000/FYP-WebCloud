const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const validateResource = require("../middlewares/validateRequest");
const forkRepositorySchema = require("../schemas/repository/fork-repository.schema");
const likeRepositorySchema = require("../schemas/repository/like-repository.schema");
const {
  getPublicRepositories,
  getAllRepositories,
  forkRepository,
  getUsersForProject,
  likeRepo,
  getPublicRepositoryById,
} = require("../controllers/repository.controller");
const logDatabase = require("../middlewares/logDatabase");

router.route("/").get(validateToken, logDatabase, getAllRepositories);
router.route("/:id").get(validateToken, logDatabase, getPublicRepositoryById);

router.route("/public").get(validateToken, logDatabase, getPublicRepositories);
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
