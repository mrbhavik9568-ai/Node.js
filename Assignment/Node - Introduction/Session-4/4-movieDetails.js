function getMovieDetails(title) {

    return new Promise(function(resolve) {

        setTimeout(function() {

            let movie = {
                title: title,
                rating: 8.5,
                genre: "Action"
            };

            resolve(movie);

        }, 1000);
    });
}


async function showMovies() {

    let movie1 = await getMovieDetails("Jawan");
    console.log(movie1);

    let movie2 = await getMovieDetails("Pathaan");
    console.log(movie2);

    let movie3 = await getMovieDetails("Animal");
    console.log(movie3);
}


showMovies();