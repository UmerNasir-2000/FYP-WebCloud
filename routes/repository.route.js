const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const {
  getPublicRepositories,
  getAllRepositories,
} = require("../controllers/repository.controller");

router.route("/").get(validateToken, getAllRepositories);
router.route("/public").get(validateToken, getPublicRepositories);

module.exports = router;
