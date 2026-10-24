const express = require("express");
const playlistRoutes = require("./routes/playlistRoutes");

const app = express();
const PORT = 8000;

// Parse JSON body
app.use(express.json());

// Playlist routes
app.use("/", playlistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});