function calculateDiscount(price, percent) {
    let discount = (price * percent) / 100;
    let finalPrice = price - discount;

    return finalPrice;
}

module.exports = calculateDiscount;