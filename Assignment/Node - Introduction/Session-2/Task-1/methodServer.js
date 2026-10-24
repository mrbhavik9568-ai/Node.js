const http = require("http");

const server = http.createServer((req, res) => {

    if (req.method === "POST") {
        res.end("POST request received");
    } else if (req.method === "GET") {

        if (req.url === "/about") {
            res.end("About Us Page");
        } else {
            res.end("Home Page");
        }

    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});