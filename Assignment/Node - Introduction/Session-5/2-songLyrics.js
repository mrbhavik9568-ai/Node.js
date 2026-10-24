function fetchSongLyrics(songName) {

    if (songName === "Perfect") {
        return "I found a love for me";
    }

    throw new Error("Lyrics API failed");
}

try {

    let lyrics = fetchSongLyrics("Perfect");

    console.log("Lyrics:", lyrics);

} catch (error) {

    console.log("Unable to fetch song lyrics:", error.message);

}