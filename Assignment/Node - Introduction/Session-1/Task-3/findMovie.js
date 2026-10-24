let movies = [
    { id: 1, name: "Jawan" },
    { id: 2, name: "Pathaan" },
    { id: 3, name: "Animal" }
];

function findMovieById(id) {
    return movies.find(function(movie) {
        return movie.id === id;
    });
}

console.log(findMovieById(2));