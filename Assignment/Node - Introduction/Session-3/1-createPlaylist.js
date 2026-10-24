const fs = require("fs");

let songs = [
    "Perfect",
    "Believer",
    "Kesariya",
    "Tum Hi Ho",
    "Shape of You"
];

fs.writeFileSync("playlist.txt", songs.join("\n"));

console.log("Playlist created successfully");