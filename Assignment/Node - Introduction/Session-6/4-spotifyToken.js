require("dotenv").config();

function useSpotifyToken() {

    const token = process.env.SPOTIFY_API_TOKEN;

    if (!token) {
        console.log("Spotify token not found");
        return;
    }

    console.log("Using Spotify API token for dummy API call...");
    console.log("Token loaded successfully");
}

useSpotifyToken();