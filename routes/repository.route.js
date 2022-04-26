const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const validateResource = require("../middlewares/validateRequest");
const forkRepositorySchema = require("../schemas/repository/fork-repository.schema");
const {
  getPublicRepositories,
  getAllRepositories,
  forkRepository,
  getUsersForProject,
  likeRepo,
  getPublicRepositoryById,
  getUserForkedProjects,
  getTrendingPublicRepositories,
  getUserRecentProject,
} = require("../controllers/repository.controller");
const logDatabase = require("../middlewares/logDatabase");

/**
 * @openapi
 * '/api/repo/public':
 *  get:
 *     tags:
 *     - Repositories
 *     summary: Fetch All Public Repositories
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                publicRepos:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      project_id:
 *                       type: number
 *                      project_name:
 *                       type: string
 *                      project_description:
 *                       type: string
 *                      project_likes:
 *                       type: number
 *                      project_createdAt:
 *                       type: string
 *                       format: date
 *                      user_first_name:
 *                        type: string
 *                      user_profile_picture_url:
 *                        type: string
 *                      user_last_name:
 *                        type: string
 *                      user_email:
 *                        type: string
 *                      web_framework:
 *                        type: string
 *                      database:
 *                        type: string
 *      400:
 *        description: Bad request
 */
router.route("/public").get(validateToken, logDatabase, getPublicRepositories);

/**
 * @openapi
 * '/api/repo/trending':
 *  get:
 *     tags:
 *     - Repositories
 *     summary: Fetch Trending Public Repositories
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                trendingRepos:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      project_id:
 *                       type: number
 *                      project_name:
 *                       type: string
 *                      project_description:
 *                       type: string
 *                      project_likes:
 *                       type: number
 *                      project_createdAt:
 *                       type: string
 *                       format: date
 *                      user_first_name:
 *                        type: string
 *                      user_profile_picture_url:
 *                        type: string
 *                      user_last_name:
 *                        type: string
 *                      user_email:
 *                        type: string
 *                      web_framework:
 *                        type: string
 *                      database:
 *                        type: string
 *      400:
 *        description: Bad request
 */
router
  .route("/trending")
  .get(validateToken, logDatabase, getTrendingPublicRepositories);

/**
 * @openapi
 * '/api/repo/recent/projects':
 *  get:
 *     tags:
 *     - Repositories
 *     summary: Fetch User's Recent Repositories
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                userRecentRepos:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      project_id:
 *                       type: number
 *                      project_name:
 *                       type: string
 *                      project_description:
 *                       type: string
 *                      project_likes:
 *                       type: number
 *                      project_createdAt:
 *                       type: string
 *                       format: date
 *                      user_first_name:
 *                        type: string
 *                      user_profile_picture_url:
 *                        type: string
 *                      user_last_name:
 *                        type: string
 *                      user_email:
 *                        type: string
 *                      web_framework:
 *                        type: string
 *                      database:
 *                        type: string
 *      400:
 *        description: Bad request
 */
router
  .route("/recent/projects")
  .get(validateToken, logDatabase, getUserRecentProject);

/**
 * @openapi
 * '/api/repo/projects':
 *  get:
 *     tags:
 *     - Repositories
 *     summary: Fetch User's Forked Repositories
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                userRecentRepos:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      project_id:
 *                       type: number
 *                      project_name:
 *                       type: string
 *                      project_description:
 *                       type: string
 *                      project_likes:
 *                       type: number
 *                      project_createdAt:
 *                       type: string
 *                       format: date
 *                      user_first_name:
 *                        type: string
 *                      user_profile_picture_url:
 *                        type: string
 *                      user_last_name:
 *                        type: string
 *                      user_email:
 *                        type: string
 *                      web_framework:
 *                        type: string
 *                      database:
 *                        type: string
 *      400:
 *        description: Bad request
 */
router
  .route("/projects")
  .get(validateToken, logDatabase, getUserForkedProjects);

/**
 * @openapi
 * '/api/repo/':
 *  get:
 *     tags:
 *     - Repositories
 *     summary: Fetch All Repositories ; Can Be Accessed By Admin Only
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                userRecentRepos:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      project_id:
 *                       type: number
 *                      project_name:
 *                       type: string
 *                      project_description:
 *                       type: string
 *                      project_likes:
 *                       type: number
 *                      project_createdAt:
 *                       type: string
 *                       format: date
 *                      user_first_name:
 *                        type: string
 *                      user_profile_picture_url:
 *                        type: string
 *                      user_last_name:
 *                        type: string
 *                      user_email:
 *                        type: string
 *                      web_framework:
 *                        type: string
 *                      database:
 *                        type: string
 *      400:
 *        description: Bad request
 */
router.route("/").get(validateToken, logDatabase, getAllRepositories);

/**
 * @openapi
 * '/api/repo/:{id}':
 *  get:
 *     tags:
 *     - Repositories
 *     summary: Fetch Repository By Id
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                repository:
 *                    type: object
 *                    properties:
 *                      project_id:
 *                       type: number
 *                      project_name:
 *                       type: string
 *                      project_description:
 *                       type: string
 *                      project_likes:
 *                       type: number
 *                      project_createdAt:
 *                       type: string
 *                       format: date
 *                      user_first_name:
 *                        type: string
 *                      user_profile_picture_url:
 *                        type: string
 *                      user_last_name:
 *                        type: string
 *                      user_email:
 *                        type: string
 *                      web_framework:
 *                        type: string
 *                      database:
 *                        type: string
 *      400:
 *        description: Bad request
 */

router.route("/:id").get(validateToken, logDatabase, getPublicRepositoryById);

/**
 * @openapi
 * '/api/repo/fork':
 *  post:
 *     tags:
 *     - Repositories
 *     summary: Fork Repository
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                repository:
 *                    type: object
 *                    properties:
 *                      project_id:
 *                       type: number
 *                      project_name:
 *                       type: string
 *                      project_description:
 *                       type: string
 *                      project_likes:
 *                       type: number
 *                      project_createdAt:
 *                       type: string
 *                       format: date
 *                      user_first_name:
 *                        type: string
 *                      user_profile_picture_url:
 *                        type: string
 *                      user_last_name:
 *                        type: string
 *                      user_email:
 *                        type: string
 *                      web_framework:
 *                        type: string
 *                      database:
 *                        type: string
 *      400:
 *        description: Bad request
 */
router
  .route("/fork")
  .post(
    validateToken,
    validateResource(forkRepositorySchema),
    logDatabase,
    forkRepository
  );

/**
 * @openapi
 * '/api/repo/like/:{id}':
 *  post:
 *     tags:
 *     - Repositories
 *     summary: Like A Public Repository
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                repository:
 *                    type: object
 *                    properties:
 *                      current_likes:
 *                       type: number
 *      400:
 *        description: Bad request
 */
router.route("/like/:id").post(validateToken, logDatabase, likeRepo);

/**
 * @openapi
 * '/api/repo/project/:{id}':
 *  get:
 *     tags:
 *     - Repositories
 *     summary: Fetch All Users Who Forked The Repository
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                repository:
 *                    type: object
 *                    properties:
 *                      project_name:
 *                       type: string
 *                      description:
 *                       type: string
 *                      likes:
 *                       type: number
 *                      first_name:
 *                       type: string
 *                      last_name:
 *                        type: string
 *                      email:
 *                        type: string
 *      400:
 *        description: Bad request
 */
router
  .route("/project/:id")
  .get(validateToken, logDatabase, getUsersForProject);

module.exports = router;
