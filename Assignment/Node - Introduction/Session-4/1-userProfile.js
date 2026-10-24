let users = [
    { username: "Dimpal", age: 21, city: "Ahmedabad" },
    { username: "Rahul", age: 22, city: "Mumbai" },
    { username: "Priya", age: 20, city: "Delhi" }
];

function getUserProfile(username, callback) {

    setTimeout(function() {

        let user = users.find(function(user) {
            return user.username === username;
        });

        callback(user);

    }, 2000);
}

getUserProfile("Dimpal", function(result) {
    console.log("User Profile:", result);
});