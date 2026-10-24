const fs = require("fs");

let newTask = process.argv[2];

let data = fs.existsSync("todo.txt") ? fs.readFileSync("todo.txt", "utf8") : "";

let tasks = data.trim() === "" ? [] : data.trim().split("\n");

let existingTask = tasks.find(function(task) {
    return task.toLowerCase() === newTask.toLowerCase();
});

if (existingTask) {

    console.log("Task already exists");

} else {

    fs.appendFileSync("todo.txt", newTask + "\n");

    console.log("Task added successfully");
}
