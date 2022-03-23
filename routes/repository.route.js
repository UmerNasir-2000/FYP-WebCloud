const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const {
  getPublicRepositories,
} = require("../controllers/repository.controller");

router.route("/").get(validateToken, getPublicRepositories);

module.exports = router;
