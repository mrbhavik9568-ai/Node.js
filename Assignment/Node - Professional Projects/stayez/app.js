/**
 * StayEZ Vacation Rental Backend
 * 
 * Implements:
 * Task 1: Express entry file displaying 'Welcome to StayEZ' on the homepage.
 * Task 2: Room model in room.js with title, location, price, and amenities.
 * Task 3 & 5: GET /rooms returning realistic rooms data (updated to 5 unique rooms).
 * Task 4: GET /rooms/search filtering rooms by 'location' query parameter using req.query.
 */

const express = require('express');
const { Room, roomsData } = require('./room');

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware for parsing JSON bodies
app.use(express.json());

// In-memory rooms list initialized with the 5 AI-seeded rooms (Tasks 3 & 5)
let rooms = [...roomsData];

// ==========================================
// ROUTES
// ==========================================

/**
 * TASK 1:
 * Homepage root route displaying 'Welcome to StayEZ'
 */
app.get('/', (req, res) => {
  res.send('Welcome to StayEZ');
});

/**
 * TASK 4:
 * GET /rooms/search
 * Accepts query parameter 'location' and returns only matching rooms
 * Uses req.query to access query parameters and filters array
 * (Placed before /rooms/:id if any to avoid route collision)
 */
app.get('/rooms/search', (req, res) => {
  const locationQuery = req.query.location;

  if (!locationQuery || locationQuery.trim() === '') {
    return res.status(400).json({
      error: "Query parameter 'location' is required. Example: /rooms/search?location=Goa"
    });
  }

  const normalizedQuery = locationQuery.trim().toLowerCase();

  // Filter rooms matching location (case-insensitive substring)
  const matchingRooms = rooms.filter(room =>
    room.location.toLowerCase().includes(normalizedQuery)
  );

  res.json({
    searchLocation: locationQuery.trim(),
    matchCount: matchingRooms.length,
    rooms: matchingRooms
  });
});

/**
 * TASK 3 & TASK 5:
 * GET /rooms
 * Returns array of rooms in JSON format (seeded with 5 unique realistic rooms)
 */
app.get('/rooms', (req, res) => {
  res.json({
    totalRooms: rooms.length,
    rooms: rooms
  });
});

/**
 * Optional Helper: POST /rooms
 * Allows adding new rooms using the Room class
 */
app.post('/rooms', (req, res) => {
  const { title, location, price, amenities } = req.body;

  if (!title || !location || price === undefined) {
    return res.status(400).json({
      error: "Missing fields: 'title', 'location', and 'price' are required."
    });
  }

  const newRoom = new Room(title.trim(), location.trim(), Number(price), amenities || []);
  rooms.push(newRoom);

  res.status(201).json({
    message: "Room added successfully to StayEZ",
    room: newRoom
  });
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[stayez] Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
