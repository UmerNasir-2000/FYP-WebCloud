const { StatusCodes } = require("http-status-codes");

const validateResource = (resourceSchema) => async (req, res, next) => {
  const resource = req.body;
  try {
    await resourceSchema.validate(resource);
    next();
  } catch (e) {
    console.error(e.errors);
    res.status(StatusCodes.BAD_REQUEST).json({ error: e.errors.join(", ") });
  }
};

module.exports = validateResource;
