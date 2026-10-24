// controllers/playlistController.js

const playlistModel = require("../model/playlistmodel.js");

// GET all playlists
const getAllPlaylists = (req, res) => {
  const playlists = playlistModel.getAll();

  res.status(200).json(playlists);
};

// POST new playlist
const addPlaylist = (req, res) => {
  const { name, songs } = req.body;

  const newPlaylist = {
    name,
    songs,
  };

  const createdPlaylist = playlistModel.add(newPlaylist);

  res.status(201).json(createdPlaylist);
};

module.exports = {
  getAllPlaylists,
  addPlaylist,
};