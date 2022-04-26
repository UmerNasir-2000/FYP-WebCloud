const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const validateAdmin = require("../middlewares/validateAdmin");
const validateResource = require("../middlewares/validateRequest");
const parameterSchema = require("../schemas/admin/admin-chart.schema");
const updateUserStatusSchema = require("../schemas/admin/update-user-status.schema");
const updateProjectStatusSchema = require("../schemas/request/update-project-status.schema");
const {
  dashboard,
  updateProjectStatus,
  charts,
  getRequests,
  dashboardRequests,
  updateUserStatus,
} = require("../controllers/admin.controller");
const logDatabase = require("../middlewares/logDatabase");

/**
 * @openapi
 * '/api/admin/dashboard':
 *  get:
 *     tags:
 *     - Admin
 *     summary: Dashboard API For Admin
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
 *                projectTemplates:
 *                  type: number
 *                totalUsers:
 *                  type: number
 *                totalProjects:
 *                  type: number
 *                pendingProjectsCount:
 *                  type: number
 *                requests:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                       type: number
 *                      status:
 *                       type: string
 *                      email:
 *                       type: string
 *                      first_name:
 *                       type: string
 *                      last_name:
 *                        type: string
 *                      createdAt:
 *                        type: string
 *                        format: date
 *                      is_public:
 *                        type: boolean
 *                      project_name:
 *                        type: string
 *                      description:
 *                        type: string
 *      400:
 *        description: Bad request
 */

router
  .route("/dashboard")
  .get(validateToken, validateAdmin, logDatabase, dashboard);
/**
 * @openapi
 * '/api/admin/charts':
 *  post:
 *     tags:
 *     - Admin
 *     summary: Fetch Charts Based On The Entity Value Provided
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - entity
 *           properties:
 *             entity:
 *               type: string
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
 *                configurations:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      web_framework:
 *                       type: string
 *                      total_web_framework:
 *                       type: number
 *      400:
 *        description: Bad request
 */
router
  .route("/charts")
  .post(
    validateToken,
    validateAdmin,
    validateResource(parameterSchema),
    logDatabase,
    charts
  );

router
  .route("/requests")
  .get(validateToken, validateAdmin, logDatabase, getRequests);

router
  .route("/dashboard-requests")
  .get(validateToken, validateAdmin, logDatabase, dashboardRequests);

router
  .route("/user-status/:id")
  .put(
    validateToken,
    validateAdmin,
    validateResource(updateUserStatusSchema),
    logDatabase,
    updateUserStatus
  );

router
  .route("/request/:id")
  .put(
    validateToken,
    validateAdmin,
    validateResource(updateProjectStatusSchema),
    logDatabase,
    updateProjectStatus
  );

module.exports = router;
