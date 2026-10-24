import express from "express";
import mongoose from "mongoose";

import Playlist from "./models/Playlist.js";
import Restaurant from "./models/Restaurant.js";
import Product from "./models/Product.js";
import Movie from "./models/Movie.js";
import User from "./models/User.js";

const app = express();
const PORT = 8000;

app.use(express.json());


// ==========================================
// DATABASE CONNECTION
// ==========================================

mongoose
  .connect("mongodb://127.0.0.1:27017/myappdb")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// ==========================================
// TASK 1
// DELETE PLAYLIST
// DELETE /playlists/:id
// ==========================================

app.delete("/playlists/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findByIdAndDelete(id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================================
// TASK 2
// GET ALL RESTAURANTS
// GET /restaurants
// ==========================================

app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
});


// ==========================================
// TASK 3
// DELETE PRODUCT
// DELETE /products/:id
// ==========================================

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================================
// TASK 4
// GET SINGLE MOVIE
// GET /movies/:id
// ==========================================

app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      movie,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================================
// TASK 5
// DELETE USER
// DELETE /users/:id
// ==========================================

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});