const express = require("express");

const app = express();

const PORT = 8000;

// 1. Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Express!");
});

// 2. Profile Route
app.get("/profile", (req, res) => {
  res.send("This is your profile page.");
});

// 3. Trending Route
app.get("/trending", (req, res) => {
  res.send("Trending Now on Insta");
});

// 3. Cart Route
app.get("/cart", (req, res) => {
  res.send("Your Flipkart Cart is empty.");
});

// 4. 404 - This should always be after all other routes
app.use((req, res) => {
  res.status(404).send("Oops! Page not found on this app.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});