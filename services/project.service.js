const { StatusCodes } = require("http-status-codes");
const { exec } = require("child_process");
const asyncHandler = require("express-async-handler");
const {
  projects,
  configurations,
  requests,
  project_history,
} = require("../models");
const sendEmail = require("../utils/email-config");
const generatePassword = require("../utils/password-generator");
const db = require("../models");

const createProjectTemplate = asyncHandler(async (req, res) => {
  const {
    project_name,
    project_description,
    is_public,
    web_framework,
    database,
  } = req.body;

  const ifExists = await projects.findOne({
    where: {
      project_name,
    },
  });

  if (ifExists)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Project Name Already Exists" });

  const project = await projects.create({
    project_name: project_name,
    path: "users/web/project/",
    description: project_description,
    is_public: is_public,
    user_id: req.user.id,
  });

  const updatedRequest = await projects.update(
    { path: `/WebCloud/${req.user.id}/${project.id}-${project_name}` },
    {
      where: {
        id: project.id,
      },
    }
  );

  let randomPassword = generatePassword();

  const projectConfig = await configurations.create({
    db_port: 3306,
    web_port: 3000,
    database,
    web_framework,
    db_password: randomPassword,
    project_id: project.id,
  });

  const projectRequest = await requests.create({ project_id: project.id });

  exec(
    `mkdir ~/WebCloud/${req.user.id}/${project.id}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );

  let createdProjectResponse = {
    id: project.id,
    username: req.user.first_name,
    time: project.createdAt,
    project_name,
    project_status: projectRequest.status,
  };

  // const userPort = await getUserPortMappingService();

  // req.user.port = userPort;

  let emailDetails = {
    email: req.user.email,
    web_framework,
    database,
    project_name,
    db_password: randomPassword,
    db_name: "LMS",
  };

  await sendEmail(emailDetails);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Project Successfully Created", createdProjectResponse });
});

const getUserProjectsService = asyncHandler(async (req, res) => {
  const userProjects = await projects.findAll({
    where: {
      user_id: req.user.id,
    },
    include: {
      model: configurations,
      required: true,
      attributes: {
        exclude: ["id", "project_id", "createdAt", "db_port", "web_port"],
      },
    },
    attributes: {
      exclude: ["user_id"],
    },
  });

  if (userProjects.length === 0)
    return res
      .status(StatusCodes.OK)
      .json({ message: "No projects for logged in user." });

  res
    .status(StatusCodes.OK)
    .json({ message: "User's Own Projects", userProjects });
});

const getUserProjectByIdService = asyncHandler(async (req, res) => {
  const hasProject = await projects.findOne({
    where: {
      user_id: req.user.id,
      id: req.params.id,
    },
    include: {
      model: configurations,
      required: true,
      attributes: {
        exclude: ["id", "project_id", "createdAt", "db_port", "web_port"],
      },
    },
  });

  if (hasProject == null) {
    return res.status(StatusCodes.OK).json({
      message: `Project Id = ${req.params.id} for User Id = ${req.params.id} does not exist.`,
    });
  }

  const projectHistories = await project_history.findAll({
    where: {
      project_id: req.params.id,
    },
  });

  res.status(StatusCodes.OK).json({
    message: `User's Own Project = ${req.params.id}`,
    hasProject,
    projectHistories,
  });
});

const getUserForkedProjectsService = asyncHandler(async (req, res) => {
  let forkedProjects = await db.sequelize.query(
    `CALL sql_web_cloud.projects_forked_logged_user($userId) `,
    {
      bind: { userId: req.user.id },
    }
  );

  res.status(StatusCodes.OK).json({
    message: `List of Projects By Forked By Logged In User`,
    forkedProjects,
  });
});

const getUserPortMappingService = asyncHandler(async () => {
  const port = await db.sequelize.query(
    `SELECT * FROM ports WHERE status = "Idle" LIMIT 1;`
  );

  console.log("port :>> ", port);

  let userPort = "";

  try {
    if (typeof port[0][0]["port_number"] == "undefined") {
      console.log(" port[0][0].length:>> ", port[0][0].length);
      console.log('port[0][0]["port_number"]', port[0][0]["port_number"]);
      userPort = port[0][0].port_number;
    }
  } catch (error) {
    console.log("error :>> ", error);
    console.log("Inside Catch Block :>> ");
  }

  const arr = port[0][0];

  const isFound = people.some((element) => {
    if (element.id === 1) {
      return true;
    }

    return false;
  });

  console.log(" port[0].length:>> ", port[0].length);
  console.log(" port[0][0].length:>> ", port[0][0].length);
  console.log(" port[0][0].[port_number]:>> ", port[0][0]["port_number"]);
  console.log(" port[0][0]:>> ", port[0][0]);

  console.log("userPort :>> ", userPort);

  return userPort;
});

module.exports = {
  createProjectTemplate,
  getUserProjectsService,
  getUserProjectByIdService,
  getUserForkedProjectsService,
};
