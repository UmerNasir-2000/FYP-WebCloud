const { exec } = require("child_process");
const fs = require("fs");

function generateEnvironmentFile(config) {
  const {
    path,
    web_volume,
    db_volume,
    db_container,
    web_container,
    db_password,
  } = config;

  const fileText = `DATABASE_CONTAINER=${db_container}\nBACKEND_CONTAINER=${web_container}\nBACKEND_VOLUME=${web_volume}\nDATABASE_VOLUME=${db_volume}\nDATABASE_PASSWORD=${db_password}\n`;

  console.log("path", path);
  console.log("Before ENV FILE GENERATOR");
  exec(`cd ${path} && echo '${fileText}' > .env`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  console.log("After ENV FILE GENERATOR");

  // fs.appendFile(`${path}.env`, fileText, (err) => {
  //   if (err) console.log(err);
  // });
}

module.exports = generateEnvironmentFile;
