const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const validateResource = require("../middlewares/validateRequest");
const forkRepositorySchema = require("../schemas/repository/fork-repository.schema");
const {
  getPublicRepositories,
  getAllRepositories,
  forkRepository,
} = require("../controllers/repository.controller");

router.route("/").get(validateToken, getAllRepositories);
router.route("/public").get(validateToken, getPublicRepositories);
router
  .route("/fork")
  .post(validateToken, validateResource(forkRepositorySchema), forkRepository);

module.exports = router;
