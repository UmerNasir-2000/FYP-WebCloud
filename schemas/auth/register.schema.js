const yup = require("yup");

let registerSchema = yup.object().shape({
  firstName: yup.string().required().min(3).max(10),
  lastName: yup.string().required().min(3).max(10),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
});

module.exports = registerSchema;
