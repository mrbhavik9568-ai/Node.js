import express from "express";

const router = express.Router();

// In-memory playlist data
let playlists = [
  {
    id: 1,
    name: "Workout Mix",
    songs: 20,
  },
  {
    id: 2,
    name: "Chill Hits",
    songs: 15,
  },
  {
    id: 3,
    name: "Coding Music",
    songs: 25,
  },
];

// Fake database delay
const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};


// ==========================================
// TASK 1 - GET ALL PLAYLISTS
// GET /playlists
// ==========================================

router.get("/", (req, res) => {
  res.status(200).json(playlists);
});


// ==========================================
// TASK 2 & 5 - UPDATE PLAYLIST
// PUT /playlists/:id
// ==========================================

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    // Task 5 - Missing data error
    if (!name) {
      return res.status(400).json({
        message: "Playlist name is required",
      });
    }

    // Simulate asynchronous database operation
    await delay(1000);

    const playlist = playlists.find(
      (item) => item.id === id
    );

    // Invalid ID
    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    playlist.name = name;

    res.status(200).json({
      message: "Playlist updated successfully",
      playlist,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});


// ==========================================
// TASK 3 - DELETE PLAYLIST
// DELETE /playlists/:id
// ==========================================

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = playlists.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Playlist not found",
    });
  }

  playlists.splice(index, 1);

  res.status(200).json({
    message: "Playlist deleted successfully",
  });
});


export default router;