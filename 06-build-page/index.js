const fs = require("fs");
const path = require("path");

fs.mkdir(__dirname + "/project-dist", { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readFile(__dirname + "/template.html", "utf-8", (err, data) => {
    if (err) { console.log(err) };
    fs.copyFile(path.join(__dirname + "/template.html"), path.join(__dirname + "/project-dist/index.html"), err => {
            if(err) throw err;
        fs.readFile(`${__dirname}/template.html`, "utf-8", (err, data) => {
            if (err) { console.log(err) }
             
            const reg = new RegExp(/\{\{\w*\}\}/g);
            const items = data.match(reg);
            let newData;
            async function replaceItem() {
                for await (let item of items) {
                    fs.readFile(__dirname + `/components/${item.substr(2, item.length - 4)}.html`, "utf-8", (err, file) => {
                        if (newData) {
                            newData = newData.replace(item, file);
                        } else {
                            newData = data.replace(item, file);
                        }
                        
                        fs.writeFile(`${__dirname}/project-dist/index.html`, newData, (err) => {
                            if(err) throw err;
                        })
                    })  
                }
            }
            replaceItem();
        })
        
    })
})

fs.readdir(__dirname + "/styles", function (err, items) {
    if (err) throw err;
    
    for (let i = 0; i < items.length; i++) {
        let filename = items[i];
        let extension = path.extname(items[i]);
        fs.stat(`${__dirname}/styles/${filename}`, (err, stats) => {
            if (err) {
                console.error(err)
                return;
            }
            stats.extension = extension;
            if (stats.isFile() && extension === ".css") {
                fs.readFile(`${__dirname}/styles/${filename}`, "utf-8", (err, data) => {
                    if (err) { console.log(err) }
                    fs.appendFile(`${__dirname}/project-dist/style.css`, data, (err) => {
                        if (err) console.log(err);
                    });
                })
            }  
        })
    }
});

fs.mkdir(__dirname + "/project-dist/assets", { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(__dirname + "/assets", function (err, directories) {
    if (err) throw err;
    directories.forEach(directory => {
        fs.mkdir(__dirname + "/project-dist/assets/" + directory, { recursive: true }, (err) => {
    
            if (err) throw err;
            fs.readdir(__dirname + "/assets/" + directory, function (err, files) {
                if (err) throw err;
                files.forEach(file => {
                    fs.copyFile(path.join(__dirname + `/assets/${directory}/${file}`), path.join(__dirname+ `/project-dist/assets/${directory}/${path.basename(file)}`), err => {
                        if(err)throw err;
                    })
                })
            })
        })
    })
    console.log("Success!")
});


