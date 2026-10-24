const path = require("path");

let filePath = "/user/music/playlist.txt";

console.log("Directory:", path.dirname(filePath));
console.log("Base Name:", path.basename(filePath));
console.log("Extension:", path.extname(filePath));