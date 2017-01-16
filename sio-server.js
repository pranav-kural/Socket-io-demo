var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);

app.use(express.static("./public"));

io.on("connection", function(socket) {
    
    socket.on("chat", function(message) {

        if (message === 'exit') {
            socket.disconnect();
        } else {
            socket.broadcast.emit("message", message);
        }
    });
    
    socket.emit("message", "Welcome to the Cyber Chat");

    console.log("Connection made");
});

console.log("Socket App running on port 3000");