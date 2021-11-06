const fs = require("fs");
const path = require("path");

fs.readdir(__dirname + "/secret-folder", function (err, items) {
    if (err) throw err;
    console.log("\nfolder Secret-folder\n");
    console.log(items);
 
    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
        let filename = items[i];
        let extension = path.extname(items[i]);
        fs.stat(`${__dirname}/secret-folder/${filename}`, (err, stats) => {
            if (err) {
                console.error(err)
                return
            }
            stats.filename = filename;
            stats.extension = extension;
            console.log('\x1b[31m%s\x1b[0m',"\nFile's name: ", filename)
            console.log("Is this a directory: ", stats.isDirectory())
            console.log("Is this a file: ", stats.isFile())
            if (stats.isFile()) {
                console.log("File's extension: ", extension)
                console.log(`File's size: ${stats.size / 1024} kb`)
            }  
        })
    }
});

