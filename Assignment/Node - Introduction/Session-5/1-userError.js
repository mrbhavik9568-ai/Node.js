function getUserById(userId) {

    if (typeof userId !== "number" || userId <= 0) {
        throw new Error("Invalid userId");
    }

    return {
        id: userId,
        name: "Dimpal",
        email: "dimpal@gmail.com"
    };
}

try {

    let user = getUserById(1);
    console.log(user);

} catch (error) {

    console.log(error.message);

}