const fs = require("fs");
const path = require("path");

const fsProm = require("fs").promises;

fs.mkdir(__dirname + "/files-copy", { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(__dirname + "/files-copy/", function (err, files) {
  async function deteleFiles() {
    try {
      for await (let file of files) {
        fsProm.unlink(__dirname + "/files-copy/" + path.basename(file));
      }
    } catch (err) {
      console.log(err);
    }
  }
  deteleFiles();
});

const filePath = __dirname + "/files";

fs.readdir(filePath, function (err, files) {
  if (err) throw err;
  files.forEach((file) => {
    fs.copyFile(
      path.join(__dirname + "/files/" + file),
      path.join(__dirname + "/files-copy/" + path.basename(file)),
      (err) => {
        if (!err) {
          console.log(file + " has been copied!");
        } else {
          throw err;
        }
      }
    );
  });
});
