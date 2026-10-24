// const fs = require("fs");
// const yargs = require("yargs/yargs");
// const { hideBin } = require("yargs/helpers");

// const argv = yargs(hideBin(process.argv))
//     .option("title", {
//         type: "string",
//         demandOption: true
//     })
//     .option("artist", {
//         type: "string",
//         demandOption: true
//     })
//     .argv;

// let songs = JSON.parse(fs.readFileSync("song.json", "utf-8"));

// let newSong = {
//     title: argv.title,
//     artist: argv.artist
// };

// songs.push(newSong);

// fs.writeFileSync("songs.json", JSON.stringify(songs, null, 2));

// console.log("Song added successfully");


const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
    .option("title", {
        type: "string",
        demandOption: true
    })
    .option("artist", {
        type: "string",
        demandOption: true
    })
    .argv;

// songs.json read karo
let songs = JSON.parse(fs.readFileSync("songs.json", "utf-8"));

// Same title check karo
let existingSong = songs.find(function(song) {
    return song.title.toLowerCase() === argv.title.toLowerCase();
});

if (existingSong) {

    console.log("Song already exists");

} else {

    let newSong = {
        title: argv.title,
        artist: argv.artist
    };

    songs.push(newSong);

    fs.writeFileSync(
        "songs.json",
        JSON.stringify(songs, null, 2)
    );

    console.log("Song added successfully");
}