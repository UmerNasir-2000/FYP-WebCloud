const { StatusCodes } = require("http-status-codes");
const { exec } = require("child_process");
const asyncHandler = require("express-async-handler");
const {
  projects,
  configurations,
  requests,
  project_history,
  ports,
  users,
} = require("../models");
const sendEmail = require("../utils/email-config");
const generatePassword = require("../utils/password-generator");
const generateEnvironmentFile = require("../utils/env-file-generator");
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
    { path: `~/WebCloud/${req.user.id}/${project.id}` },
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

  let templatePath = "PHP-MySQL";
  if (database === "MongoDB") {
    templatePath = "Nodejs-MongoDB";
  }
  exec(
    `rsync -a ~/WebCloud-Templates/${templatePath} ~/WebCloud/${req.user.id}/${project.id}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );

  let config = {
    path: `~/WebCloud/${req.user.id}/${project.id}/${templatePath}/`,
    web_volume: "./php/src",
    db_volume: "./init",
    db_container: `${project.id}-db`,
    web_container: `${project.id}-web`,
    db_password: randomPassword,
  };

  req.session.container = `${project.id}-db`;
  req.session.path = `/home/umer/WebCloud/${req.user.id}/${project.id}/${templatePath}/`;

  console.log("INSIDE CREATE PROJECT :>> ");
  console.log("req.session.path", req.session.path);

  generateEnvironmentFile(config);

  const port = await getUserPortMappingService(req.user.id);

  req.user.port = port;
  req.user.path = `~/WebCloud/${req.user.id}/${project.id}`;
  //req.session.path = `~/WebCloud/${req.user.id}/${project.id}`;

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

const getUserPortMappingService = asyncHandler(async (id) => {
  let port = 0;

  const foundUser = await users.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["id", "status"],
    },
  });

  if (foundUser.dataValues.port != null) return foundUser.dataValues.port;

  const portNumber = await ports.findOne({
    where: {
      status: "Idle",
    },
    attributes: {
      exclude: ["id", "status"],
    },
  });

  if (portNumber == null) {
    const newPort = await ports.findOne({
      where: {
        status: "Occupied",
      },
      attributes: {
        exclude: ["id", "status"],
      },
      order: [["id", "DESC"]],
    });

    port = newPort.dataValues.port_number + 1;

    const newPortEntry = await ports.create({
      port_number: port,
      status: "Occupied",
    });
  } else {
    port = portNumber.dataValues.port_number;
    await ports.update(
      { status: "Occupied" },
      {
        where: {
          port_number: port,
        },
      }
    );
  }

  await users.update(
    { port: port },
    {
      where: {
        id,
      },
    }
  );

  return port;
});

const startProjectService = asyncHandler(async (req, res) => {
  console.log("req.session.path :>> ", req.session.path);
  exec(
    `cd ${req.session.path} && docker-compose up -d`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );

  res.status(StatusCodes.OK).json({ message: "Started Project Successfully." });
});

const exitProjectService = asyncHandler(async (req, res) => {
  exec(
    `cd ${req.user.path} && docker-compose down`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );

  res.status(StatusCodes.OK).json({ message: "Exited Project Successfully." });
});

module.exports = {
  createProjectTemplate,
  getUserProjectsService,
  getUserProjectByIdService,
  getUserForkedProjectsService,
  startProjectService,
  exitProjectService,
};
