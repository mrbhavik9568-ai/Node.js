const express = require("express");

const app = express();
const PORT = 8000;

// ==========================================
// TASK 1 - Home Route
// ==========================================
app.get("/home", (req, res) => {
  res.send("Welcome to Foodie!");
});

// About Route
app.get("/about", (req, res) => {
  res.send("About Foodie App");
});


// ==========================================
// TASK 2 & 5 - Dynamic Restaurant Route
// ==========================================
app.get("/restaurant/:name", (req, res) => {
  const { name } = req.params;

  // Task 5 validation
  if (!name || name.trim() === "") {
    return res.status(400).send("Restaurant name required");
  }

  res.send(`You are viewing ${name}`);
});


// ==========================================
// TASK 3 - Search Query
// Example: /search?q=pizza
// ==========================================
app.get("/search", (req, res) => {
  const { q } = req.query;

  res.send(`Results for: ${q}`);
});


// ==========================================
// TASK 4 - Params + Query String
// Example: /movie/123/details?genre=action
// ==========================================
app.get("/movie/:id/details", (req, res) => {
  const { id } = req.params;
  const { genre } = req.query;

  res.json({
    id: id,
    genre: genre,
  });
});


// ==========================================
// TASK 5 - Missing Restaurant Name
// ==========================================

// /restaurant/ does NOT match /restaurant/:name,
// so handle it separately.
app.get("/restaurant", (req, res) => {
  res.status(400).send("Restaurant name required");
});


// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});