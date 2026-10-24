const express = require("express");

const app = express();


// Parse JSON data
app.use(express.json());


// =============================================
// LOGIN API
// NO CORS CONFIGURATION
// =============================================

app.post("/login", (req, res) => {

  console.log("Login Data:");

  console.log(req.body);


  res.json({

    success: true,

    message: "Login successful"

  });

});


// =============================================
// SERVER
// =============================================

app.listen(5000, () => {

  console.log(
    "Backend server running on http://localhost:5000"
  );

});