const fs = require("fs");

let artist = process.argv[2];

let songs = JSON.parse(fs.readFileSync("songs.json", "utf-8"));

let result = songs.filter(function(song) {
    return song.artist.toLowerCase() === artist.toLowerCase();
});

result.forEach(function(song) {
    console.log(song.title);
});