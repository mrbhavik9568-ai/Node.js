const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Welcome to NodeJS Web Server");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});