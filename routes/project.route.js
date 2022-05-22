const express = require("express");
const router = express.Router();
const validateResource = require("../middlewares/validateRequest");
const validateToken = require("../middlewares/validateToken");
const createProjectSchema = require("../schemas/project/create-project-template.schema");
const {
  createUserProjectTemplate,
  getUserProjects,
  getUserProjectById,
  getUserForkedProjects,
  startProject,
  exitProject,
} = require("../controllers/project.controller");
const logDatabase = require("../middlewares/logDatabase");

/**
 * @openapi
 * '/api/user/:id':
 *  get:
 *     tags:
 *     - Projects
 *     summary: Fetch project by id
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
 *                project_name:
 *                  type: string
 *                description:
 *                  type: string
 *                path:
 *                  type: string
 *                is_public:
 *                  type: boolean
 *                likes:
 *                  type: number
 *                createdAt:
 *                  type: string
 *                  example: "2019-05-17"
 *                configurations:
 *                  type: object
 *                  properties:
 *                    database:
 *                      type: string
 *                    web_framework:
 *                      type: string
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.route("/user/:id").get(validateToken, logDatabase, getUserProjectById);

/**
 * @openapi
 * '/api/user':
 *  get:
 *     tags:
 *     - Projects
 *     summary: Fetch all projects for logged in user
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
 *                project_name:
 *                  type: string
 *                description:
 *                  type: string
 *                path:
 *                  type: string
 *                is_public:
 *                  type: boolean
 *                likes:
 *                  type: number
 *                createdAt:
 *                  type: string
 *                  example: "2019-05-17"
 *                configurations:
 *                  type: object
 *                  properties:
 *                    database:
 *                      type: string
 *                    web_framework:
 *                      type: string
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.route("/user").get(validateToken, logDatabase, getUserProjects);

/**
 * @openapi
 * '/api/project/create-template':
 *  post:
 *     tags:
 *     - Projects
 *     summary: Create project template
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - project_name
 *             - project_description
 *             - web_framework
 *             - database
 *             - is_public
 *           properties:
 *             project_name:
 *               type: string
 *             project_description:
 *               type: string
 *             web_framework:
 *               type: string
 *               example: "PHP"
 *             database:
 *               type: string
 *               example: "MySQL"
 *             is_public:
 *               type: boolean
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                project_name:
 *                  type: string
 *                status:
 *                  type: string
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router
  .route("/create-template")
  .post(
    validateToken,
    validateResource(createProjectSchema),
    logDatabase,
    createUserProjectTemplate
  );

router
  .route("/forked-projects")
  .get(validateToken, logDatabase, getUserForkedProjects);

router.route("/start").get(validateToken, logDatabase, startProject);
router.route("/exit").get(validateToken, logDatabase, exitProject);

module.exports = router;
