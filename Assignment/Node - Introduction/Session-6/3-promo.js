const allowedCodes = [
    "SAVE100",
    "ZOMATO50",
    "FOOD20"
];

function checkPromoCode(promoCode) {

    // Special characters aur spaces check
    if (!/^[A-Za-z0-9]+$/.test(promoCode)) {
        return "Invalid promo code";
    }

    if (allowedCodes.includes(promoCode)) {
        return "Promo code applied successfully";
    }

    return "Invalid promo code";
}


console.log(checkPromoCode("SAVE100"));
console.log(checkPromoCode("ZOMATO50"));
console.log(checkPromoCode("SAVE 100"));
console.log(checkPromoCode("SAVE@100"));