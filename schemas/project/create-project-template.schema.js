const yup = require("yup");

let createProjectSchema = yup.object().shape({
  project_name: yup.string().required(),
  project_description: yup.string().required().min(5),
  web_framework: yup
    .mixed()
    .oneOf(["PHP", "Node.js", "Nest.js", "Dotnet", "Spring Boot"]),
  database: yup.mixed().oneOf(["MySQL", "MongoDB"]),
  is_public: yup.boolean().required(),
});

module.exports = createProjectSchema;
