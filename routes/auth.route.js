const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");
const validateResource = require("../middlewares/validateRequest");
const validateToken = require("../middlewares/validateToken");
const registerSchema = require("../schemas/auth/register.schema");
const loginSchema = require("../schemas/auth/login.schema");

router.route("/register").post(validateResource(registerSchema), registerUser);

router.route("/login").post(validateResource(loginSchema), loginUser);

module.exports = router;
