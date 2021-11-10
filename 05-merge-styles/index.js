const fs = require("fs");
const path = require("path");
const fsProm = require("fs").promises;

fs.readdir(__dirname + "/project-dist/bundle.css", function (err) {
  async function deteleFiles() {
    try {
      fsProm.unlink(__dirname + "/project-dist/bundle.css");
    } catch (err) {
      console.log(err);
    }
  }
  deteleFiles();
});

fs.readdir(__dirname + "/styles", function (err, items) {
  if (err) throw err;
  console.log(items);

  for (let i = 0; i < items.length; i++) {
    let filename = items[i];
    let extension = path.extname(items[i]);
    fs.stat(`${__dirname}/styles/${filename}`, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      stats.extension = extension;
      if (stats.isFile() && extension === ".css") {
        fs.readFile(`${__dirname}/styles/${filename}`, "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          }
          fs.appendFile(`${__dirname}/project-dist/bundle.css`, data, (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
          });
        });
      }
    });
  }
});
