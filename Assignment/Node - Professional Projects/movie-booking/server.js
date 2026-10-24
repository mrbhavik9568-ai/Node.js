/**
 * Movie Ticket Booking Express App
 * 
 * Implements:
 * Task 1: Serves /movies from movieRoutes.js
 * Task 2: Serves POST /book-ticket
 * Task 3: Serves GET /search-movies
 * Task 4: Error handling middleware with 4 parameters catching errors and returning 500 JSON.
 * Task 5: AI-generated seat collision validation.
 */

const express = require('express');
const { router: movieRoutes } = require('./movieRoutes');

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware for parsing JSON bodies
app.use(express.json());

// Welcome index route
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Movie Ticket Booking System (BookMyShow Clone)",
    endpoints: {
      upcomingMovies: "GET /movies",
      searchMovies: "GET /search-movies?q=spider",
      bookTicket: "POST /book-ticket (body: { movieId, seatNumber, userEmail })",
      testError: "GET /movies?simulateError=true"
    }
  });
});

// Mount movie routes
app.use('/', movieRoutes);

// ==========================================
// TASK 4: ERROR HANDLING MIDDLEWARE
// Catches errors from booking or search routes
// and returns a JSON response with status code 500
// ==========================================
app.use((err, req, res, next) => {
  console.error('[Error Middleware Caught Error]:', err.message);

  res.status(500).json({
    error: "Internal Server Error",
    status: 500,
    message: err.message || "An unexpected error occurred while processing your request.",
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[movie-booking] Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
