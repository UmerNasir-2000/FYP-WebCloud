const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controllers/auth.controller");
const validateResource = require("../middlewares/validateRequest");
const validateToken = require("../middlewares/validateToken");
const registerSchema = require("../schemas/auth/register.schema");
const loginSchema = require("../schemas/auth/login.schema");
const forgotPasswordSchema = require("../schemas/auth/forgot-password.schema");
const logDatabase = require("../middlewares/logDatabase");

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - email
 *             - password
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router
  .route("/register")
  .post(validateResource(registerSchema), logDatabase, registerUser);

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               format: password
 *               type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                id:
 *                  type: number
 *                username:
 *                  type: string
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                profile_picture_url:
 *                  type: string
 *                is_admin:
 *                  type: boolean
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router
  .route("/login")
  .post(validateResource(loginSchema), logDatabase, loginUser);

router
  .route("/forgot-password")
  .post(validateResource(forgotPasswordSchema), logDatabase, forgotPassword);

module.exports = router;
