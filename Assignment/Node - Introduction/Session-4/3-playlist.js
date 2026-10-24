let playlists = [
    {
        name: "My Playlist",
        songs: ["Perfect", "Believer"]
    },
    {
        name: "Workout",
        songs: ["On Top of the World"]
    }
];


function getPlaylist(name) {

    return new Promise(function(resolve, reject) {

        setTimeout(function() {

            let playlist = playlists.find(function(playlist) {
                return playlist.name === name;
            });

            if (playlist) {
                resolve(playlist);
            } else {
                reject("Playlist not found");
            }

        }, 1000);
    });
}


function addSong(playlist, song) {

    return new Promise(function(resolve) {

        setTimeout(function() {

            playlist.songs.push(song);
            resolve(playlist);

        }, 1000);
    });
}


async function updatePlaylist() {

    try {

        let playlist = await getPlaylist("My Playlist");

        console.log("Playlist found:", playlist);

        let updatedPlaylist = await addSong(playlist, "Kesariya");

        console.log("Updated Playlist:", updatedPlaylist);

    } catch (error) {

        console.log("Error:", error);

    }
}


updatePlaylist();