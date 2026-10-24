import express from "express";

import playlistRoutes from "./routes/playlistRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 8000;

// Parse JSON
app.use(express.json());


// ==========================================
// ROUTES
// ==========================================

app.use("/playlists", playlistRoutes);

app.use("/users", userRoutes);


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.send("API is running");
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});