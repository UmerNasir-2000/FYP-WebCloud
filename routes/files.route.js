const express = require("express");
const router = express.Router();
const {
  getFilesList,
  getFancyFilesList,
  getFileContent,
  saveNewFileContent,
  createNewFile,
} = require("../controllers/files.controller");

//router.route("/").get(getFilesList);
router.route("/").get(getFancyFilesList);
router.route("/file").post(getFileContent);
router.route("/save-code").put(saveNewFileContent);
router.route("/create-file").post(createNewFile);

module.exports = router;
