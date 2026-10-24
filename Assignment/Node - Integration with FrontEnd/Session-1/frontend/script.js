// ======================================================
// TASK 1 + TASK 4
// PLAYLIST FORM USING FETCH()
// ======================================================

const playlistForm = document.getElementById("playlistForm");

const playlistMessage = document.getElementById("playlistMessage");


playlistForm.addEventListener("submit", async function (event) {

  event.preventDefault();


  const playlistName =
    document.getElementById("playlistName").value;

  const description =
    document.getElementById("description").value;


  const playlistData = {

    playlistName: playlistName,

    description: description

  };


  try {

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(playlistData)

      }
    );


    // ==========================================
    // TASK 4
    // Check API response status
    // ==========================================

    if (response.ok) {

      const data = await response.json();

      console.log("Playlist Created:");

      console.log(data);


      playlistMessage.textContent =
        "Playlist added successfully!";

      playlistMessage.className = "success";


      playlistForm.reset();

    }
    else {

      playlistMessage.textContent =
        "Failed to add playlist.";

      playlistMessage.className = "error";

    }

  }
  catch (error) {

    console.error(error);


    playlistMessage.textContent =
      "Something went wrong while adding playlist.";

    playlistMessage.className = "error";

  }

});



// ======================================================
// TASK 2 + TASK 5
// FETCH TRENDING SHOWS USING AXIOS
// ======================================================

const movieButton =
  document.getElementById("movieButton");

const movieList =
  document.getElementById("movieList");

const movieMessage =
  document.getElementById("movieMessage");


movieButton.addEventListener("click", getMovies);


async function getMovies() {

  movieList.innerHTML = "";

  movieMessage.textContent = "";


  try {

    const response =
      await axios.get(
        "https://api.tvmaze.com/shows"
      );


    // Get first 5 shows

    const firstFiveShows =
      response.data.slice(0, 5);


    console.log("First 5 Trending Shows:");

    firstFiveShows.forEach(function (show) {

      console.log(show.name);

    });


    // Display on webpage also

    firstFiveShows.forEach(function (show) {

      const li =
        document.createElement("li");

      li.textContent = show.name;

      movieList.appendChild(li);

    });


    movieMessage.textContent =
      "Movies loaded successfully.";

    movieMessage.className = "success";

  }
  catch (error) {

    console.error(
      "Movie API Error:",
      error
    );


    // ==========================================
    // TASK 5
    // User friendly error message
    // ==========================================

    movieMessage.textContent =
      "Unable to load movies. Please check your internet connection or try again later.";

    movieMessage.className = "error";

  }

}



// ======================================================
// TASK 3
// LOGIN REQUEST TO DIFFERENT PORT
// ======================================================

const loginForm =
  document.getElementById("loginForm");

const loginMessage =
  document.getElementById("loginMessage");


loginForm.addEventListener("submit", async function (event) {

  event.preventDefault();


  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;


  const loginData = {

    username: username,

    password: password

  };


  try {

    const response = await fetch(
      "http://localhost:5000/login",
      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(loginData)

      }
    );


    const data =
      await response.json();


    console.log(data);


    loginMessage.textContent =
      "Login request successful.";

  }
  catch (error) {

    console.error(
      "CORS Error:",
      error
    );


    loginMessage.textContent =
      "Request blocked. Check browser console for CORS error.";

    loginMessage.className = "error";

  }

});