const {
    calculateDiscount,
    applyCoupon
} = require("./4-discountCalculator");

let price = 1500;
let discountPercent = 10;

let discountedPrice = calculateDiscount(price, discountPercent);

console.log("Price after 10% discount:", discountedPrice);

let finalPrice = applyCoupon(discountedPrice, "SAVE100");

console.log("Final Price after Coupon:", finalPrice);