const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/products") {
        res.end("iPhone 14, Nike Shoes, Boat Headphones");
    } else {
        res.end("Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});