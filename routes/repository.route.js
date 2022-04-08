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

router.route("/").get(validateToken, getAllRepositories);
router.route("/:id").get(validateToken, getPublicRepositoryById);

router.route("/public").get(validateToken, getPublicRepositories);
router
  .route("/fork")
  .post(validateToken, validateResource(forkRepositorySchema), forkRepository);

router.route("/like/:id").post(validateToken, likeRepo);

router.route("/project/:id").get(validateToken, getUsersForProject);

module.exports = router;
