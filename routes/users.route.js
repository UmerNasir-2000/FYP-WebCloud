const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const { getUsers } = require("../controllers/user.controller");
const logDatabase = require("../middlewares/logDatabase");

router.route("/").get(validateToken, logDatabase, getUsers);

module.exports = router;
