const express = require("express");
const pty = require("pty.js");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./models");
const app = express();
const expressWs = require("express-ws")(app);

dotenv.config();

var terminals = {};

app.use(express.static(__dirname + "/public"));

expressWs.app.ws("/terminals/:pid", function (ws, req) {
  var term = terminals[parseInt(req.params.pid)];

  term.on("data", function (data) {
    ws.send(data);
  });

  ws.on("message", function (msg) {
    term.write(msg);
  });
});

app.post("/terminals", function (req, res) {
  var cols = parseInt(req.query.cols),
    rows = parseInt(req.query.rows),
    term = pty.spawn("docker", ["exec", "-it", "db", "/bin/sh"], {
      name: "xterm-color",
      cols: cols || 80,
      rows: rows || 24,
      cwd: process.env.PWD,
      env: process.env,
    });

  console.log("Created terminal with PID: " + term.pid);
  terminals[term.pid] = term;

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

app.use("/", require("./routes/index"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/admin", require("./routes/admin.route"));
app.use("/api/project", require("./routes/project.route"));
app.use("/api/repo", require("./routes//repository.route"));
app.use("/api/user", require("./routes/users.route"));
app.use("/api/files", require("./routes/files.route"));

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV || "development";

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `SERVER RUNNING IN ${ENVIRONMENT} MODE ON http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
