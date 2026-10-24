function getOrderStatus(orderId) {

    return new Promise(function(resolve, reject) {

        setTimeout(function() {

            if (!orderId) {
                reject(new Error("Order ID is missing"));
            } else {
                resolve("Order " + orderId + " is confirmed");
            }

        }, 1000);
    });
}


async function checkOrder() {

    try {

        let result = await getOrderStatus(101);

        console.log(result);

    } catch (error) {

        console.log("Error:", error.message);

    }
}


checkOrder();