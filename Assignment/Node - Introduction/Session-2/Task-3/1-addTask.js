const fs = require("fs");

let task = process.argv[2];

fs.appendFileSync("todo.txt", task + "\n");

console.log("Task added successfully");