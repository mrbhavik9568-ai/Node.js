function selectRestaurant() {
    return new Promise(function(resolve) {

        setTimeout(function() {
            console.log("Restaurant selected");
            resolve("Zomato Restaurant");

        }, 1000);
    });
}


function selectFood(restaurant) {
    return new Promise(function(resolve) {

        setTimeout(function() {
            console.log("Food selected from " + restaurant);
            resolve("Pizza");

        }, 1000);
    });
}


function placeOrder(food) {
    return new Promise(function(resolve) {

        setTimeout(function() {
            console.log("Order placed for " + food);
            resolve("Order successful");

        }, 1000);
    });
}


selectRestaurant()
    .then(function(restaurant) {
        return selectFood(restaurant);
    })
    .then(function(food) {
        return placeOrder(food);
    })
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });