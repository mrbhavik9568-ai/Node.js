import express from "express";
import multer from "multer";

import {
  uploadAvatar,
  uploadPostImage,
} from "./middleware/uploadMiddleware.js";

const app = express();
const PORT = 8000;

app.use(express.json());


// ==========================================
// TASK 1 & 2
// POST /upload-avatar
// ==========================================

app.post(
  "/upload-avatar",
  uploadAvatar.single("avatar"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        error: "Avatar image is required",
      });
    }

    res.status(200).json({
      message: "Avatar uploaded successfully",
      filename: req.file.filename,
    });
  }
);


// ==========================================
// TASK 3 & 5
// POST /upload-post-image
// ==========================================

app.post(
  "/upload-post-image",
  uploadPostImage.single("image"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        error: "Post image is required",
      });
    }

    res.status(200).json({
      message: "Post image uploaded successfully",

      filename: req.file.filename,

      size: req.file.size,
    });
  }
);


// ==========================================
// TASK 4
// CUSTOM MULTER ERROR HANDLER
// Keep this AFTER all routes
// ==========================================

app.use((err, req, res, next) => {

  // Multer errors
  if (err instanceof multer.MulterError) {

    // File larger than limit
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "File is too large. Maximum size is 1MB.",
      });
    }

    return res.status(400).json({
      error: err.message,
    });
  }

  // File type / extension validation errors
  if (err) {
    return res.status(400).json({
      error: err.message,
    });
  }

  next();
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});
