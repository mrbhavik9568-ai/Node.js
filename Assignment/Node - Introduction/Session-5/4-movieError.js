async function fetchMovieDetails() {

    throw new Error("Movie not found");

}

async function main() {

    try {

        await fetchMovieDetails();

    } catch (err) {

        console.log(err.message);

    }

}

main();