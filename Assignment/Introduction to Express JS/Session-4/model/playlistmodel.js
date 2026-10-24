// models/playlistModel.js

let playlists = [
  {
    name: "Chill Hits",
    songs: 20,
  },
  {
    name: "Workout Mix",
    songs: 15,
  },
  {
    name: "Top Hits",
    songs: 30,
  },
];

// Get all playlists
const getAll = () => {
  return playlists;
};

// Add new playlist
const add = (playlist) => {
  playlists.push(playlist);
  return playlist;
};

module.exports = {
  getAll,
  add,
};