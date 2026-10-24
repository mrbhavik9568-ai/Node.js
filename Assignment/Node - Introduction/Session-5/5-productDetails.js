function fetchProductDetails(productId) {

    return new Promise(function(resolve, reject) {

        try {

            if (!productId) {
                throw new Error("Product ID is missing");
            }

            setTimeout(function() {

                if (productId === 999) {
                    reject(new Error("Product not found"));
                } else {

                    resolve({
                        id: productId,
                        name: "iPhone 14",
                        price: 59999
                    });

                }

            }, 1000);

        } catch (error) {

            reject(error);

        }

    });
}


async function getProduct() {

    try {

        let product = await fetchProductDetails(101);

        console.log("Product:", product);

    } catch (error) {

        console.log("Unable to fetch product details. Please try again.");

    }

}


getProduct();