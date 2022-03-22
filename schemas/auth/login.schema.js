const yup = require("yup");

let loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

module.exports = loginSchema;
