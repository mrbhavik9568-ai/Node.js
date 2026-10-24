const fs = require("fs");

let taskNumber = Number(process.argv[2]);

let data = fs.readFileSync("todo.txt", "utf8");

let tasks = data.trim().split("\n");

tasks.splice(taskNumber - 1, 1);

fs.writeFileSync("todo.txt", tasks.join("\n") + "\n");

console.log("Task removed successfully");

console.log("\nUpdated Tasks:");

tasks.forEach(function(task, index) {
    console.log(`${index + 1}. ${task}`);
});