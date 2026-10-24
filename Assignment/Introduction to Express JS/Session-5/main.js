const express = require("express");

const app = express();
const PORT = 8000;

// Parse JSON request body
app.use(express.json());

// ==========================================
// TRACKS DATA
// ==========================================

let tracks = [
  {
    id: 1,
    name: "Blinding Lights",
    artist: "The Weeknd",
  },
  {
    id: 2,
    name: "Shape of You",
    artist: "Ed Sheeran",
  },
  {
    id: 3,
    name: "Believer",
    artist: "Imagine Dragons",
  },
];


// ==========================================
// TASK 1 - GET ALL TRACKS
// GET /tracks
// Status: 200
// ==========================================

app.get("/tracks", (req, res) => {
  res.status(200).json(tracks);
});


// ==========================================
// TASK 2 & 5 - ADD NEW TRACK
// POST /tracks
// Status: 201
// ==========================================

app.post("/tracks", (req, res) => {
  const { name, artist } = req.body;

  // Task 5 - Validation
  if (!name || !artist) {
    return res.status(400).json({
      error: "Name and artist are required",
    });
  }

  // Generate unique ID
  const newTrack = {
    id: Date.now(),
    name: name,
    artist: artist,
  };

  tracks.push(newTrack);

  res.status(201).json(newTrack);
});


// ==========================================
// TASK 3 - DELETE TRACK
// DELETE /tracks/:id
// ==========================================

app.delete("/tracks/:id", (req, res) => {
  const id = Number(req.params.id);

  const trackIndex = tracks.findIndex(
    (track) => track.id === id
  );

  // Track not found
  if (trackIndex === -1) {
    return res.status(404).json({
      error: "Track not found",
    });
  }

  // Remove track
  tracks.splice(trackIndex, 1);

  // Successfully deleted
  res.status(204).send();
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});