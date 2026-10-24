import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

// ==================================================
// TASK 1
// 5 Daily Actions - Instagram Example
// ==================================================

app.get("/daily-actions", (req, res) => {
  const actions = [
    {
      action: "View Instagram posts",
      method: "GET",
    },
    {
      action: "Create a new post",
      method: "POST",
    },
    {
      action: "Update profile",
      method: "PUT",
    },
    {
      action: "Delete a post",
      method: "DELETE",
    },
    {
      action: "View profile",
      method: "GET",
    },
  ];

  res.status(200).json(actions);
});


// ==================================================
// TASK 2
// Playlist API Contract
// ==================================================

app.get("/api-contract", (req, res) => {
  const contract = [
    {
      method: "POST",
      endpoint: "/playlists",
      description: "Create a new playlist",
    },
    {
      method: "GET",
      endpoint: "/playlists",
      description: "Get all playlists",
    },
    {
      method: "GET",
      endpoint: "/playlists/:id",
      description: "Get playlist details",
    },
    {
      method: "POST",
      endpoint: "/playlists/:id/songs",
      description: "Add a song to a playlist",
    },
    {
      method: "DELETE",
      endpoint: "/playlists/:id/songs/:songId",
      description: "Remove a song from a playlist",
    },
    {
      method: "PUT",
      endpoint: "/playlists/:id",
      description: "Update playlist",
    },
    {
      method: "DELETE",
      endpoint: "/playlists/:id",
      description: "Delete playlist",
    },
  ];

  res.status(200).json(contract);
});


// ==================================================
// TASK 3
// Update Delivery Address
// PUT /users/:id/address
// ==================================================

app.put("/users/:id/address", (req, res) => {
  const userId = req.params.id;

  const {
    address,
    city,
    state,
    pincode,
  } = req.body;

  res.status(200).json({
    message: "Delivery address updated successfully",
    userId: userId,
    address: {
      address,
      city,
      state,
      pincode,
    },
  });
});


// ==================================================
// TASK 4
// REST Principle Violations
// ==================================================

app.get("/rest-violations", (req, res) => {
  res.status(200).json([
    {
      wrong: "POST /getMovies",
      problem:
        "GET should be used for retrieving movies and the endpoint should use a resource name.",
      correct: "GET /movies",
    },
    {
      wrong: "GET /deleteBooking/:id",
      problem:
        "GET should not delete data. DELETE should be used.",
      correct: "DELETE /bookings/:id",
    },
  ]);
});


// ==================================================
// HOME
// ==================================================

app.get("/", (req, res) => {
  res.send("REST API Assignment Running");
});


// ==================================================
// START SERVER
// ==================================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});