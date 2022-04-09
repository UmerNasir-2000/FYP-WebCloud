const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");
const validateResource = require("../middlewares/validateRequest");
const validateToken = require("../middlewares/validateToken");
const registerSchema = require("../schemas/auth/register.schema");
const loginSchema = require("../schemas/auth/login.schema");
const logDatabase = require("../middlewares/logDatabase");

router
  .route("/register")
  .post(validateResource(registerSchema), logDatabase, registerUser);

router
  .route("/login")
  .post(validateResource(loginSchema), logDatabase, loginUser);

module.exports = router;
