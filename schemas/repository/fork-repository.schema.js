const yup = require("yup");

let forkRepositorySchema = yup.object().shape({
  project_id: yup.number().required(),
});

module.exports = forkRepositorySchema;
