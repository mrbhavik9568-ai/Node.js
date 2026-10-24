const EventEmitter = require("events");

const notification = new EventEmitter();

notification.on("newMessage", function() {
    console.log("You have a new message!");
});

notification.on("newFollower", function(username) {
    console.log(`You are followed by ${username}`);
});

notification.emit("newMessage");

notification.emit("newFollower", "Dimpal");