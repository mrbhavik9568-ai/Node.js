const EventEmitter = require("events");

const notification = new EventEmitter();

notification.on("newMessage", function() {
    console.log("You have a new message!");
});

notification.emit("newMessage");