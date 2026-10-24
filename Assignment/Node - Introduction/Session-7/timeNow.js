const os = require("os");
const path = require("path");

console.log("Operating System:", os.platform());
console.log("Current Directory:", path.dirname(__filename));
