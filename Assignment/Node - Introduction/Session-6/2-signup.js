const express = require("express");

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {

    const { username, email } = req.body;

    if (!username || username.length < 4) {
        return res.status(400).json({
            error: "Username must be at least 4 characters"
        });
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
        return res.status(400).json({
            error: "Invalid email"
        });
    }

    res.json({
        message: "Signup successful",
        username: username,
        email: email
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});