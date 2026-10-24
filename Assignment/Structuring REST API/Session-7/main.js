import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());


// ==========================================
// IN-MEMORY DATA
// ==========================================

let playlists = [
  {
    id: 1,
    name: "Workout Mix",
    description: "Songs for workout",
  },
  {
    id: 2,
    name: "Chill Music",
    description: "Relaxing songs",
  },
];

let movies = [
  {
    id: 1,
    title: "Avengers",
    genre: "Action",
    releaseYear: 2012,
  },
  {
    id: 2,
    title: "Joker",
    genre: "Drama",
    releaseYear: 2019,
  },
];


// ==========================================
// TASK 1
// POST /api/playlist
// ==========================================

app.post("/api/playlist", (req, res) => {
  const { name, description } = req.body;

  // Validation
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Name and description are required",
    });
  }

  const newPlaylist = {
    id: Date.now(),
    name,
    description,
  };

  playlists.push(newPlaylist);

  res.status(201).json({
    success: true,
    message: "Playlist created successfully",
    playlist: newPlaylist,
  });
});


// ==========================================
// TASK 2
// POST /api/movie
// ==========================================

app.post("/api/movie", (req, res) => {
  const { title, genre, releaseYear } = req.body;

  // Check required fields
  if (!title || !genre || releaseYear === undefined) {
    return res.status(400).json({
      success: false,
      message: "Title, genre and releaseYear are required",
    });
  }

  // Title validation
  if (title.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Title must be at least 2 characters",
    });
  }

  // Release year validation
  if (typeof releaseYear !== "number") {
    return res.status(400).json({
      success: false,
      message: "releaseYear must be a number",
    });
  }

  const newMovie = {
    id: Date.now(),
    title,
    genre,
    releaseYear,
  };

  movies.push(newMovie);

  res.status(201).json({
    success: true,
    message: "Movie created successfully",
    movie: newMovie,
  });
});


// ==========================================
// TASK 3
// PUT /api/playlist/:id
// ==========================================

app.put("/api/playlist/:id", (req, res) => {
  const id = Number(req.params.id);

  const { name, description } = req.body;

  const playlist = playlists.find(
    (item) => item.id === id
  );

  // Playlist not found
  if (!playlist) {
    return res.status(404).json({
      success: false,
      message: "Playlist not found",
    });
  }

  // Validation
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Name and description are required",
    });
  }

  // Update playlist
  playlist.name = name;
  playlist.description = description;

  res.status(200).json({
    success: true,
    message: "Playlist updated successfully",
    playlist,
  });
});


// ==========================================
// TASK 4
// PUT /api/movie/:id
// ==========================================

app.put("/api/movie/:id", (req, res) => {
  const id = Number(req.params.id);

  const { genre, releaseYear } = req.body;

  const movie = movies.find(
    (item) => item.id === id
  );

  // Movie not found
  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }

  // Allowed genres
  const allowedGenres = [
    "Action",
    "Drama",
    "Comedy",
    "Thriller",
  ];

  // Genre validation
  if (!allowedGenres.includes(genre)) {
    return res.status(400).json({
      success: false,
      message:
        "Genre must be Action, Drama, Comedy or Thriller",
    });
  }

  // Release year validation
  if (typeof releaseYear !== "number") {
    return res.status(400).json({
      success: false,
      message: "releaseYear must be a number",
    });
  }

  // Update movie
  movie.genre = genre;
  movie.releaseYear = releaseYear;

  res.status(200).json({
    success: true,
    message: "Movie updated successfully",
    movie,
  });
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});