const fs = require("fs");

let data = fs.readFileSync("todo.txt", "utf8");

let tasks = data.trim().split("\n");

tasks.forEach(function(task, index) {
    console.log(`${index + 1}. ${task}`);
});
