/**
 * movieRoutes.js
 * 
 * Implements:
 * Task 1: GET /movies returning hardcoded list of 5 upcoming movies (title, language, release date).
 * Task 2: POST /book-ticket accepting movieId, seatNumber, userEmail and responding with confirmation.
 * Task 3: GET /search-movies filtering movies by title (case-insensitive) using query param 'q'.
 * Task 5: AI-generated seat validation function ensuring no duplicate bookings.
 */

const express = require('express');
const router = express.Router();

// ==========================================
// TASK 1: 5 UPCOMING MOVIES DATA
// ==========================================
const movies = [
  {
    id: 1,
    title: "Avatar 3: Fire and Ash",
    language: "English",
    releaseDate: "2026-12-19",
    genre: "Sci-Fi / Adventure",
    duration: "190 mins"
  },
  {
    id: 2,
    title: "Spider-Man: Beyond the Spider-Verse",
    language: "English",
    releaseDate: "2026-11-05",
    genre: "Animation / Superhero",
    duration: "140 mins"
  },
  {
    id: 3,
    title: "Kalki 2898 AD Part 2",
    language: "Telugu / Hindi",
    releaseDate: "2026-11-20",
    genre: "Sci-Fi / Mythological",
    duration: "185 mins"
  },
  {
    id: 4,
    title: "Avengers: Secret Wars",
    language: "English",
    releaseDate: "2027-05-01",
    genre: "Action / Sci-Fi",
    duration: "180 mins"
  },
  {
    id: 5,
    title: "War 2",
    language: "Hindi",
    releaseDate: "2026-08-14",
    genre: "Action / Spy Thriller",
    duration: "160 mins"
  }
];

// In-memory booked seats per movieId
const movieBookedSeats = {
  1: ["A1", "A2", "C5"],
  2: ["B3", "B4"],
  3: ["F1", "F2"],
  4: ["H10"],
  5: ["D10", "D11"]
};

// ==========================================
// TASK 5: AI-GENERATED SEAT VALIDATION FUNCTION
// 
// COMMENT ON HOW AI (ChatGPT / Copilot) HELPED IMPROVE/DEBUG THIS CODE:
// 1. Bug Fix - Case Sensitivity: The initial check `bookedSeats.includes(seatNumber)`
//    caused double-bookings when a user input lowercase "a1" while existing seats had "A1".
//    The AI suggested normalizing all seats via `.toUpperCase().trim()` to eliminate this loophole.
// 2. Input Validation: The AI introduced defensive parameter checking (e.g., verifying
//    seat format using a standard grid pattern `/^[A-Z][0-9]{1,2}$/i`), preventing invalid seat numbers.
// 3. Clear Separation of Concerns: Encapsulating the validation logic in a pure function
//    made unit testing and future database integration trivial.
// ==========================================
function isSeatAlreadyBooked(bookedSeatsArray, newSeatNumber) {
  if (!Array.isArray(bookedSeatsArray) || !newSeatNumber || typeof newSeatNumber !== 'string') {
    return false;
  }
  const normalizedNewSeat = newSeatNumber.trim().toUpperCase();
  return bookedSeatsArray.some(seat => seat.trim().toUpperCase() === normalizedNewSeat);
}

// Seat format validator
function isValidSeatFormat(seatNumber) {
  return /^[A-Z][0-9]{1,2}$/i.test(seatNumber?.trim());
}

// ==========================================
// ROUTES
// ==========================================

/**
 * TASK 1:
 * GET /movies
 * Returns hardcoded list of 5 upcoming movies in JSON format
 */
router.get('/movies', (req, res, next) => {
  try {
    // Allows testing of 500 error handling middleware if requested
    if (req.query.simulateError === 'true') {
      throw new Error("Simulated database failure in /movies route");
    }

    res.json({
      totalUpcoming: movies.length,
      movies: movies
    });
  } catch (err) {
    next(err); // Forward to error handling middleware (Task 4)
  }
});

/**
 * TASK 3:
 * GET /search-movies
 * Query parameter 'q' filters movies by title (case-insensitive) like BookMyShow
 */
router.get('/search-movies', (req, res, next) => {
  try {
    if (req.query.simulateError === 'true') {
      throw new Error("Simulated query execution failure in /search-movies route");
    }

    const searchTerm = (req.query.q || '').trim();

    if (!searchTerm) {
      return res.json({
        searchTerm: "",
        resultsCount: movies.length,
        movies: movies
      });
    }

    // BookMyShow style case-insensitive filter
    const matchedMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    res.json({
      searchTerm: searchTerm,
      resultsCount: matchedMovies.length,
      movies: matchedMovies
    });
  } catch (err) {
    next(err); // Forward to error handling middleware (Task 4)
  }
});

/**
 * TASK 2 & TASK 5:
 * POST /book-ticket
 * Accepts movieId, seatNumber, userEmail.
 * Validates seat availability using AI-generated validation.
 * Responds with confirmation message including all three details.
 */
router.post('/book-ticket', (req, res, next) => {
  try {
    if (req.query.simulateError === 'true' || req.body.simulateError === true) {
      throw new Error("Simulated payment gateway crash during ticket booking");
    }

    const { movieId, seatNumber, userEmail } = req.body;

    // Validate presence of required fields
    if (!movieId || !seatNumber || !userEmail) {
      return res.status(400).json({
        error: "Missing required fields. Please provide 'movieId', 'seatNumber', and 'userEmail'."
      });
    }

    // Validate movie exists
    const numericMovieId = parseInt(movieId, 10);
    const movie = movies.find(m => m.id === numericMovieId);
    if (!movie) {
      return res.status(404).json({
        error: `Movie with ID ${movieId} not found.`
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail.trim())) {
      return res.status(400).json({
        error: "Invalid email format. Please provide a valid email address."
      });
    }

    // Validate seat number format (e.g. A1, B12)
    if (!isValidSeatFormat(seatNumber)) {
      return res.status(400).json({
        error: "Invalid seat number format. Must be row letter followed by seat number (e.g. 'A1', 'B12')."
      });
    }

    // Initialize booked seats array for movie if needed
    if (!movieBookedSeats[numericMovieId]) {
      movieBookedSeats[numericMovieId] = [];
    }

    const currentSeats = movieBookedSeats[numericMovieId];
    const normalizedSeat = seatNumber.trim().toUpperCase();

    // TASK 5: AI-generated validation to check if seat is already booked
    if (isSeatAlreadyBooked(currentSeats, normalizedSeat)) {
      return res.status(409).json({
        error: "Seat Already Booked",
        message: `Seat ${normalizedSeat} is already booked for '${movie.title}'. Please choose a different seat.`,
        bookedSeats: currentSeats
      });
    }

    // Book the seat
    currentSeats.push(normalizedSeat);

    // Confirmation message with movieId, seatNumber, and userEmail
    res.status(201).json({
      message: `Ticket booked successfully for ${movie.title}!`,
      confirmation: {
        bookingId: `BMS-${Date.now().toString(36).toUpperCase()}`,
        movieId: movie.id,
        movieTitle: movie.title,
        language: movie.language,
        releaseDate: movie.releaseDate,
        seatNumber: normalizedSeat,
        userEmail: userEmail.trim(),
        bookingStatus: "CONFIRMED",
        bookingTime: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err); // Forward to error handling middleware (Task 4)
  }
});

// Helper to inspect booked seats for testing
router.get('/booked-seats/:movieId', (req, res) => {
  const movieId = parseInt(req.params.movieId, 10);
  res.json({
    movieId,
    bookedSeats: movieBookedSeats[movieId] || []
  });
});

module.exports = {
  router,
  movies,
  movieBookedSeats,
  isSeatAlreadyBooked
};
