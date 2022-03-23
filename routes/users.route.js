const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const { getUsers } = require("../controllers/user.controller");

router.route("/").get(validateToken, getUsers);

module.exports = router;
