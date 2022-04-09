const express = require("express");
const router = express.Router();
const {
  getFilesList,
  getFancyFilesList,
  getFileContent,
  saveNewFileContent,
  createNewFile,
} = require("../controllers/files.controller");
const logDatabase = require("../middlewares/logDatabase");

//router.route("/").get(getFilesList);
router.route("/").get(logDatabase, getFancyFilesList);
router.route("/file").post(logDatabase, getFileContent);
router.route("/save-code").put(logDatabase, saveNewFileContent);
router.route("/create-file").post(logDatabase, createNewFile);

module.exports = router;
