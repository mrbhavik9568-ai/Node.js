import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());


// ==========================================
// IN-MEMORY PLAYLIST DATA
// ==========================================

let playlists = [
  {
    id: 1,
    name: "Workout Mix",
    songs: ["Believer", "Thunder", "Radioactive"],
  },
  {
    id: 2,
    name: "Chill Songs",
    songs: ["Perfect", "Photograph"],
  },
];


// ==========================================
// TASK 1 & 4
// POST /playlist
// Create playlist using Promise chaining
// ==========================================

app.post("/playlist", (req, res) => {
  const { name, songs } = req.body;

  if (!name || !Array.isArray(songs)) {
    return res.status(400).json({
      message: "Playlist name and songs array are required",
    });
  }

  const addPlaylist = () => {
    return new Promise((resolve) => {
      const newPlaylist = {
        id: Date.now(),
        name,
        songs,
      };

      playlists.push(newPlaylist);

      resolve(newPlaylist);
    });
  };

  const getAllPlaylists = () => {
    return Promise.resolve(playlists);
  };

  // Task 4 - Promise chaining
  addPlaylist()
    .then((createdPlaylist) => {
      console.log("Created Playlist:", createdPlaylist);

      return getAllPlaylists();
    })
    .then((allPlaylists) => {
      res.status(201).json({
        message: "Playlist created successfully",
        playlists: allPlaylists,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
    });
});


// ==========================================
// TASK 2
// GET /playlist/:id
// ==========================================

app.get("/playlist/:id", (req, res) => {
  const id = Number(req.params.id);

  const playlist = playlists.find(
    (playlist) => playlist.id === id
  );

  if (!playlist) {
    return res.status(404).json({
      message: "Playlist not found",
    });
  }

  res.status(200).json(playlist);
});


// ==========================================
// TASK 3
// GET /playlists
// Only name + total songs
// ==========================================

app.get("/playlists", (req, res) => {
  const result = playlists.map((playlist) => {
    return {
      name: playlist.name,
      totalSongs: playlist.songs.length,
    };
  });

  res.status(200).json(result);
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});