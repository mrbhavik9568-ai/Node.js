const fs = require("fs");

fs.readFile("books.txt", "utf8", function(err, data) {

    if (err) {
        console.log("Error reading books.txt");
        return;
    }

    console.log(data);
});