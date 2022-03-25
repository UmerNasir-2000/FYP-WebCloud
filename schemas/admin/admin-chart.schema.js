const yup = require("yup");

let parameterSchema = yup.object().shape({
  entity: yup.mixed().oneOf(["database", "web_framework"]).required(),
});

module.exports = parameterSchema;
