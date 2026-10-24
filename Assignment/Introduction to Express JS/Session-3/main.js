const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

// ==================================================
// TASK 1 - Parse JSON data
// ==================================================
app.use(express.json());


// ==================================================
// TASK 2 - requestTime Middleware
// ==================================================
function requestTime(req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
}

app.use(requestTime);


// ==================================================
// TASK 3 & 5 - instaLogger Middleware
// ==================================================
function instaLogger(req, res, next) {

  // Task 5: Do not log /health
  if (req.path === "/health") {
    return next();
  }

  res.on("finish", () => {
    console.log(
      `Method: ${req.method} | URL: ${req.originalUrl} | Status: ${res.statusCode}`
    );
  });

  next();
}

// Mount logger globally
app.use(instaLogger);


// ==================================================
// TASK 4 - body-parser for URL-encoded form data
// ==================================================
app.use(bodyParser.urlencoded({ extended: true }));


// ==================================================
// TASK 1 - Feedback
// ==================================================
app.post("/feedback", (req, res) => {

  console.log("Feedback Body:", req.body);

  res.json({
    message: "Feedback received",
    data: req.body,
  });
});


// ==================================================
// TASK 2 - Time Check
// ==================================================
app.get("/time-check", (req, res) => {

  res.json({
    requestTime: req.requestTime,
  });

});


// ==================================================
// TASK 3 - Test Route 1
// ==================================================
app.get("/home", (req, res) => {
  res.send("Welcome Home");
});


// ==================================================
// TASK 3 - Test Route 2
// ==================================================
app.get("/profile", (req, res) => {
  res.send("Instagram Profile");
});


// ==================================================
// TASK 4 - Playlist
// ==================================================
app.post("/playlist", (req, res) => {

  const { song, artist } = req.body;

  res.send(
    `Song "${song}" by "${artist}" added to your playlist.`
  );

});


// ==================================================
// TASK 5 - Health Route
// instaLogger will NOT log this request
// ==================================================
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});


// ==================================================
// Start Server
// ==================================================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});