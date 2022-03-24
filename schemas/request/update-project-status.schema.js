const yup = require("yup");

let updateProjectStatusSchema = yup.object().shape({
  project_status: yup
    .mixed()
    .oneOf(["Pending", "Approved", "Rejected"])
    .required(),
});

module.exports = updateProjectStatusSchema;
