const yup = require("yup");

let forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

module.exports = forgotPasswordSchema;
