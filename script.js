// Global variables

const featuredMovie = document.getElementById("featuredMovie");
const addMovieBtn = document.getElementById("addMovieBtn");
const saveMovieBtn = document.getElementById("saveMovieBtn");
const movieForm = document.getElementById("movieForm");

// Featured section
// next step: show most highly rated. if equal ratings, show alphabetical

// Add movie
addMovieBtn.addEventListener("click", () => {
  movieForm.classList.toggle("hidden");
});

saveMovieBtn.addEventListener("click", () => {
  // Post
  form.reset();
});

// Render selected movie by its genre, group movies by genre, fetch
// TODO: populate by genre dynamically, populate other genre section randomly

const renderMovie = (movie, genreSection) => {
  console.log("Rendering movie:", movie.movieName);
  const movieBox = document.createElement("div");
  movieBox.className = "movie-box";
  movieBox.innerHTML = `
    <img src="${movie.poster}" alt="${movie.movieName}" />
    <h3 class="movie-name">${movie.movieName}</h3>
    <p class="movie-rating">${movie.viewRatings}</p>
  `;
  genreSection.appendChild(movieBox);
};

const makeList = (movies) => {
  movies.forEach((movie) => {
    movie.genre.forEach((genre) => {
      const genres = genre.split(", ").map((g) => g.toLowerCase());
      genres.forEach((g) => {
        const genreSection = document.querySelector(`#${g} .movie-row`);
        if (genreSection !== null) renderMovie(movie, genreSection);
      });
    });
  });
};

fetch("http://localhost:3000/moviesDB")
  .then((response) => response.json())
  .then((movies) => {
    makeList(movies);
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

// Implement functionality to increase/decrease ratings

// mouseOver animation for movie boxes

// function addToFavorites(movieTitle) {
//   alert('Added "' + movieTitle + '" to Favorites!');
// }

// function addToWatchList(movieTitle) {
//   alert('Added "' + movieTitle + '" to WatchList!');
// }

// function rateMovie(movieTitle) {
//   alert('Rating "' + movieTitle + '"...');
// }
