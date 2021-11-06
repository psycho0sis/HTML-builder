const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname + '/text.txt');
const stream = new fs.ReadStream(filePath, "utf-8");
 
let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));