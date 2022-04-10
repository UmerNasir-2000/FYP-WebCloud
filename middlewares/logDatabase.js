const { logs } = require("../models");
const logger = require("../utils/logger");

const logDatabase = async (req, res, next) => {
  const tempBody = req.body;

  tempBody.password ? (tempBody.password = "") : "";
  await logs.create({
    ip_address: req.socket.remoteAddress.split("::")[1],
    request_url: req.originalUrl,
    request_body: JSON.stringify(tempBody),
    request_method: req.method,
    user_id: req.user ? req.user.id : 0,
    user_agent: req.headers["user-agent"],
  });

  logger.info(`${req.method} ${req.originalUrl} HIT`);

  next();
};

module.exports = logDatabase;
