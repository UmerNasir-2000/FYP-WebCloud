const yup = require("yup");

let updateUserStatusSchema = yup.object().shape({
  user_status: yup.mixed().oneOf(["Enable", "Disable"]).required(),
});

module.exports = updateUserStatusSchema;
