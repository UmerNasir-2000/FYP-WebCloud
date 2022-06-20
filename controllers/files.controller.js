const fsExtra = require("fs-extended");
const fs = require("fs");
const path = require("path");

/**
 *   @desc    GET USERS SAVED CODE FILES LIST
 *   @route   GET /api/code/container
 *   @access  PRIVATE
 *   @author  UMER NASIR
 **/

var directoryPath =
  "/home/umer/project_templates/docker-compose-php-mysql-master/php/src";
var idCounter = 1;
var children = [];
var allFiles = [];

exports.saveNewFileContent = (req, res) => {
  const { fileName, fileContent } = req.body;
  // console.log(fileName, fileContent);
  directoryPath = req.session.path;
  let fullPath = `${directoryPath}php/src`;
  console.log("fullPath :>> ", fullPath);
  console.log("INSIDE SAVE NEW FILE CONTENT");
  fs.writeFile(fullPath + "/" + fileName, fileContent, function (err) {
    if (err) return console.log(err);
  });
  res.status(204).json({ msg: "File Contents Saved." });
};

exports.createNewFile = (req, res) => {
  const { newFileName, newFileNameExtension } = req.body;
  console.log("INSIDE CREATE NEW FILE");

  directoryPath = req.session.path;
  let fullPath = `${directoryPath}php/src`;
  console.log("directoryPath :>> ", fullPath);

  fs.writeFile(
    fullPath + "/" + newFileName + "." + newFileNameExtension,
    "",
    function (err) {
      if (err) return console.log(err);
    }
  );
  res.status(201).json({ msg: "File Created" });
};

exports.getFancyFilesList = async (req, res) => {
  console.log("Inside Fancy Files List");
  directoryPath = req.session.path;
  let fullPath = `${directoryPath}php/src`;
  console.log("directoryPath :>> ", fullPath);
  fsExtra.listAll(fullPath, { recursive: 1, map: map }, function (err, files) {
    if (err) {
      console.log(err);
    }
    allFiles = files;
    res.status(200).json(files);
  });
};

exports.getFileContent = (req, res) => {
  directoryPath = req.session.path;
  let fullPath = `${directoryPath}php/src`;
  console.log("directoryPath :>> ", fullPath);
  console.log("INSIDE GET FILE CONTENT");
  let fileData = "";
  const { fileName } = req.body;
  const myFile = allFiles.find((fileObj) => fileObj.title === fileName);
  fs.readFile(fullPath + "/" + myFile.title, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    fileData = data;
    res.status(200).json(fileData);
  });
};

function map(itemPath, stat) {
  console.log(itemPath);
  const isDirectory = stat.isDirectory(itemPath);
  const title = path.basename(itemPath);
  const key = `${idCounter++}`;
  let parentName = path.dirname(itemPath).split("/").pop();
  console.log(`Parent Name = ${parentName}, Node Name = ${title}`);
  let fileObject = { title, key };
  if (isDirectory) {
    fileObject = { ...fileObject, folder: true };
  } else {
    children = [];
  }
  return fileObject;
}
exports.getFilesList = (req, res) => {};
