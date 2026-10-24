const calculateDiscount = require("./2-discountCalculator");

let price = 1500;
let discountPercent = 10;

let finalPrice = calculateDiscount(price, discountPercent);

console.log("Final Price:", finalPrice);
