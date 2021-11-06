const fs = require("fs");
const path = require('path');

console.log(__dirname + "/files-copy")
fs.mkdir(__dirname + "/files-copy", { recursive: true }, (err) => {
  if (err) throw err;
});

const filePath = __dirname + "/files";

fs.readdir(filePath, function (err, files) {
    if (err) throw err;
    files.forEach(file => {
        fs.copyFile(path.join(__dirname + "/files/" + file), path.join(__dirname + "/files-copy/" + path.basename(file)), err => {
            if(!err){
                console.log(file + " has been copied!");
            } else {
                throw err;
            }
        })
    });
})
