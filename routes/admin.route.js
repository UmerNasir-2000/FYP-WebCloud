const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const validateAdmin = require("../middlewares/validateAdmin");
const { dashboard } = require("../controllers/admin.controller");

router.route("/dashboard").get(validateToken, validateAdmin, dashboard);

module.exports = router;
