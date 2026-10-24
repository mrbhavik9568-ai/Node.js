//Prompt

// Suggest improvements for securely handling environment variables in a Node.js application. Explain how to prevent secrets such as API keys and database passwords from being accidentally committed to GitHub.

require("dotenv").config();

if (!process.env.API_KEY) {
    console.log("API key is not configured");
} else {
    console.log("API key loaded successfully");
}