/**
 * Playlist App Backend API
 * 
 * Implements:
 * Task 1: Express server responding with 'Welcome to Playlist App' on root route.
 * Task 2: Song model in song.js imported and used.
 * Task 3: GET /songs returning song list in JSON.
 * Task 4: POST /songs adding new song and returning updated list.
 * Task 5: AI-assisted input validation ensuring non-empty title and positive duration.
 */

const express = require('express');
const { Song, initialSongs } = require('./song');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware to parse incoming JSON bodies (Task 4 Hint)
app.use(express.json());

// In-memory song list initialized with the 3 sample Song instances
let playlist = [...initialSongs];

// ==========================================
// TASK 5: AI-ASSISTED VALIDATION FUNCTION
// Validates that title is not empty, artist is present,
// and duration is a strictly positive number.
// ==========================================
function validateSongInput(body) {
  const errors = [];

  // Check title
  if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
    errors.push("Title is required and cannot be empty.");
  }

  // Check artist (optional fallback or required)
  if (!body.artist || typeof body.artist !== 'string' || body.artist.trim().length === 0) {
    errors.push("Artist is required and cannot be empty.");
  }

  // Check duration: must be a positive number
  const durationNum = Number(body.duration);
  if (body.duration === undefined || body.duration === null || isNaN(durationNum) || durationNum <= 0) {
    errors.push("Duration must be a positive number representing seconds (e.g. 180).");
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      title: body.title.trim(),
      artist: body.artist.trim(),
      duration: durationNum
    } : null
  };
}

// ==========================================
// ROUTES
// ==========================================

/**
 * TASK 1:
 * Root route responding with 'Welcome to Playlist App'
 */
app.get('/', (req, res) => {
  res.send('Welcome to Playlist App');
});

/**
 * TASK 3:
 * GET /songs
 * Returns the list of all songs in JSON format.
 */
app.get('/songs', (req, res) => {
  res.json({
    totalSongs: playlist.length,
    songs: playlist
  });
});

/**
 * TASK 4 & TASK 5:
 * POST /songs
 * Validates inputs, creates new Song instance, updates song list,
 * and responds with updated list.
 */
app.post('/songs', (req, res) => {
  // Validate input using the AI-generated validation logic
  const validation = validateSongInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      error: "Validation Failed",
      details: validation.errors
    });
  }

  const { title, artist, duration } = validation.sanitized;

  // Create new Song instance using Song model class (Task 2)
  const newSong = new Song(title, artist, duration);

  // Add to in-memory playlist
  playlist.push(newSong);

  // Return updated song list as response (Task 4)
  res.status(201).json({
    message: "Song added successfully",
    addedSong: newSong,
    updatedSongList: playlist
  });
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[playlist-app] Server is running on http://localhost:${PORT}`);
  });
}

module.exports = { app, playlist, validateSongInput };
