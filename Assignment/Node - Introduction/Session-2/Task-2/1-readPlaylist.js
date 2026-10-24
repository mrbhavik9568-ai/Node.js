const fs = require("fs");

fs.readFile("playlist.txt", "utf8", function(err, data) {

    if (err) {
        console.log("Error reading file");
        return;
    }

    console.log(data);
});