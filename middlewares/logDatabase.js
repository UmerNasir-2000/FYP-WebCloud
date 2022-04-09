const { logs } = require("../models");

const logDatabase = async (req, res, next) => {
  await logs.create({
    ip_address: req.socket.remoteAddress,
    request_url: req.originalUrl,
    request_body: JSON.stringify(req.body),
    request_method: req.method,
    user_id: req.user ? req.user.id : 0,
  });

  next();
};

module.exports = logDatabase;
