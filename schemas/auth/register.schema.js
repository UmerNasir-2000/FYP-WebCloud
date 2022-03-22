const yup = require("yup");

let registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().required(),
});

module.exports = registerSchema;
