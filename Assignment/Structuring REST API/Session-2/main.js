import express from "express";
import mongoose from "mongoose";

import categoryRoutes from "./routes/categoryRoutes.js";
import songRoutes from "./routes/songRoutes.js";

const app = express();

const PORT = 8000;

// Parse JSON
app.use(express.json());


// =====================================
// MongoDB Connection
// =====================================

mongoose
  .connect("mongodb://127.0.0.1:27017/playlistdb")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// =====================================
// Routes
// =====================================

app.use("/categories", categoryRoutes);

app.use("/songs", songRoutes);


// Home
app.get("/", (req, res) => {
  res.send("Playlist API is running");
});


// =====================================
// Start Server
// =====================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});