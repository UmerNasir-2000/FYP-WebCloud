const { createServer } = require("http");
const express = require("express");
const pty = require("node-pty");
const os = require("os");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./models");
var app = express();
const expressWs = require("express-ws")(app);
const logger = require("./utils/logger");
const swaggerDocs = require("./utils/swagger");
const { Server } = require("socket.io");
var session = require("express-session");

const USE_BINARY = os.platform() !== "win32";

dotenv.config();

var terminals = {},
  logs = {};

const httpServer = createServer(app);

app.use(express.static(__dirname + "/public"));

expressWs.app.ws("/terminals/:pid", function (ws, req) {
  var term = terminals[parseInt(req.params.pid)];
  // Spawn the shell
  // Compliments of http://krasimirtsonev.com/blog/article/meet-evala-your-terminal-in-the-browser-extension
  // var term = pty.spawn('/bin/bash', [], {
  //     name: 'xterm-color',
  //     cwd: process.env.PWD,
  //     env: process.env
  // });

  // console.log('Created terminal with PID: ' + term.pid);
  // terminals[term.pid] = term;

  // res.send(term.pid.toString());
  // res.end();

  // For all shell data send it to the websocket
  term.on("data", function (data) {
    ws.send(data);
  });
  // For all websocket data send it to the shell
  ws.on("message", function (msg) {
    term.write(msg);
  });
});

// app.ws("/terminals/:pid", function (ws, req) {
//   var term = terminals[parseInt(req.params.pid)];
//   console.log("Connected to terminal " + term.pid);
//   ws.send(logs[term.pid]);

//   // string message buffering
//   function buffer(socket, timeout) {
//     let s = "";
//     let sender = null;
//     return (data) => {
//       s += data;
//       if (!sender) {
//         sender = setTimeout(() => {
//           socket.send(s);
//           s = "";
//           sender = null;
//         }, timeout);
//       }
//     };
//   }
//   // binary message buffering
//   function bufferUtf8(socket, timeout) {
//     let buffer = [];
//     let sender = null;
//     let length = 0;
//     return (data) => {
//       buffer.push(data);
//       length += data.length;
//       if (!sender) {
//         sender = setTimeout(() => {
//           socket.send(Buffer.concat(buffer, length));
//           buffer = [];
//           sender = null;
//           length = 0;
//         }, timeout);
//       }
//     };
//   }
//   const send = USE_BINARY ? bufferUtf8(ws, 5) : buffer(ws, 5);

//   term.on("data", function (data) {
//     try {
//       send(data);
//     } catch (ex) {
//       // The WebSocket is not open, ignore
//     }
//   });
//   ws.on("message", function (msg) {
//     term.write(msg);
//   });
//   ws.on("close", function () {
//     term.kill();
//     console.log("Closed terminal " + term.pid);
//     // Clean things up
//     delete terminals[term.pid];
//     delete logs[term.pid];
//   });
// });

// app.post("/terminals", function (req, res) {
//   console.log("req.user", req.user);
//   const env = Object.assign({}, process.env);
//   env["COLORTERM"] = "truecolor";
//   var cols = parseInt(req.query.cols),
//     rows = parseInt(req.query.rows),
//     term = pty.spawn(process.platform === "win32" ? "cmd.exe" : "bash", [], {
//       name: "xterm-256color",
//       cols: cols || 80,
//       rows: rows || 24,
//       cwd: process.platform === "win32" ? undefined : env.PWD,
//       env: env,
//       encoding: USE_BINARY ? null : "utf8",
//     });

//   console.log("Created terminal with PID: " + term.pid);
//   terminals[term.pid] = term;
//   logs[term.pid] = "";
//   term.on("data", function (data) {
//     logs[term.pid] += data;
//   });
//   res.send(term.pid.toString());
//   res.end();
// });

// app.post("/terminals/:pid/size", function (req, res) {
//   var pid = parseInt(req.params.pid),
//     cols = parseInt(req.query.cols),
//     rows = parseInt(req.query.rows),
//     term = terminals[pid];

//   term.resize(cols, rows);
//   console.log(
//     "Resized terminal " + pid + " to " + cols + " cols and " + rows + " rows."
//   );
//   res.end();
// });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/"))
);

app.use(
  "/jquery",
  express.static(path.join(__dirname, "/node_modules/jquery/dist/"))
);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", require("./routes/index"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/admin", require("./routes/admin.route"));
app.use("/api/project", require("./routes/project.route"));
app.use("/api/repo", require("./routes/repository.route"));
app.use("/api/user", require("./routes/users.route"));
app.use("/api/files", require("./routes/files.route"));

app.post("/terminals", function (req, res) {
  console.log("req.session", req.session);
  const env = Object.assign({}, process.env);
  console.log("req.session.container", req.session.container);
  env["COLORTERM"] = "truecolor";
  var cols = parseInt(req.query.cols),
    rows = parseInt(req.query.rows),
    term = pty.spawn(
      "docker",
      ["exec", "-it", req.session.container, "/bin/sh"],
      {
        name: "xterm-color",
        cols: cols || 80,
        rows: rows || 24,
        cwd: process.env.PWD,
        env: process.env,
      }
    );

  console.log("Created terminal with PID: " + term.pid);
  terminals[term.pid] = term;
  logs[term.pid] = "";
  term.on("data", function (data) {
    logs[term.pid] += data;
  });
  res.send(term.pid.toString());
  res.end();
});

app.post("/terminals/:pid/size", function (req, res) {
  var pid = parseInt(req.params.pid),
    cols = parseInt(req.query.cols),
    rows = parseInt(req.query.rows),
    term = terminals[pid];

  term.resize(cols, rows);
  console.log(
    "Resized terminal " + pid + " to " + cols + " cols and " + rows + " rows."
  );
  res.end();
});

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV || "development";

const io = new Server(httpServer);

io.on("connection", (socket) => {
  logger.info(`Client Connected Successfully with Id = ${socket.id}`);

  socket.on("project", (data) => {
    io.emit("admin", "You're ready to go Mr. Nasir");
  });

  socket.on("notification", (data) => {
    io.emit("fetch_notification", data);
  });
});

db.sequelize
  .sync()
  .then(() => {
    httpServer.listen(process.env.APP_PORT, () => {
      logger.info(
        `SERVER RUNNING IN ${ENVIRONMENT} MODE ON http://localhost:${process.env.APP_PORT}`
      );
      swaggerDocs(app, PORT);
    });

    app.listen(process.env.XTERM_PORT, () => {
      logger.info(
        `SERVER RUNNING IN ${ENVIRONMENT} MODE ON http://localhost:${process.env.XTERM_PORT}`
      );
    });
  })
  .catch((err) => logger.error(err));

module.exports = app;
