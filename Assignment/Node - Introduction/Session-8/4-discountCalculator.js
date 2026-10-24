function calculateDiscount(price, percent) {
    let discount = (price * percent) / 100;
    let finalPrice = price - discount;

    return finalPrice;
}

function applyCoupon(price, couponCode) {

    if (couponCode === "SAVE100") {
        return price - 100;
    }

    return price;
}

module.exports = {
    calculateDiscount,
    applyCoupon
};
