const yup = require("yup");

let likeRepositorySchema = yup.object().shape({
  likeCount: yup.number().required().positive(),
});

module.exports = likeRepositorySchema;
