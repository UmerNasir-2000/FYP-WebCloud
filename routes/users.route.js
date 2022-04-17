const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const { getUsers, getUserById } = require("../controllers/user.controller");
const validateAdmin = require("../middlewares/validateAdmin");
const logDatabase = require("../middlewares/logDatabase");

/**
 * @openapi
 * '/api/user/:id':
 *  get:
 *     tags:
 *     - Users
 *     summary: Fetch user by specific id
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
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *                email:
 *                  type: string
 *                has_subscription:
 *                  type: boolean
 *                profile_picture_url:
 *                  type: string
 *                status:
 *                  type: string
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router
  .route("/:id")
  .get(validateToken, logDatabase, validateAdmin, getUserById);

/**
 * @openapi
 * '/api/user/':
 *  get:
 *     tags:
 *     - Users
 *     summary: Fetch all users
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
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *                email:
 *                  type: string
 *                has_subscription:
 *                  type: boolean
 *                profile_picture_url:
 *                  type: string
 *                status:
 *                  type: string
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.route("/").get(validateToken, logDatabase, validateAdmin, getUsers);

module.exports = router;
