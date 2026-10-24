const readline = require("readline");
const validator = require("validator");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your email: ", function(email) {

    if (validator.isEmail(email)) {
        console.log("Valid Email");
    } else {
        console.log("Invalid Email");
    }

    rl.close();
});