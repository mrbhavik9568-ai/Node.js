// routes/playlistRoutes.js

const express = require("express");

const {
  getAllPlaylists,
  addPlaylist,
} = require("../controller/playlistController.js");

const router = express.Router();

// GET /playlists
router.get("/playlists", getAllPlaylists);

// POST /playlists
router.post("/playlists", addPlaylist);

module.exports = router;