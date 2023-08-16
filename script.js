//TODO: watchlist, favorites, filter, search

// Global variables

const addMovieBtn = document.getElementById("addMovieBtn");
const saveMovieBtn = document.getElementById("saveMovieBtn");
const movieForm = document.getElementById("movieForm");

// Featured section
// TODO: randomly change the featured image to show movies rated higher than 8

const renderFeaturedMovie = (movie) => {
  const featuredPoster = document.querySelector("#featuredPoster");
  const featuredMovieName = document.querySelector("#featuredMovieName");
  const featuredRating = document.querySelector("#featuredRating");

  featuredPoster.src = movie.poster;
  featuredPoster.alt = movie.movieName;
  featuredMovieName.textContent = movie.movieName;
  featuredRating.textContent = `Rating: ${movie.viewRatings}`;
};

const makeListFeatured = (movies) => {
  movies.forEach((movie) => {
    const sortMovies = movies.sort(
      (a, b) => parseFloat(b.viewRatings) - parseFloat(a.viewRatings)
    );
    const highestRatedMovie = sortMovies[0];
    renderFeaturedMovie(highestRatedMovie);
  });
};

// Add movie
addMovieBtn.addEventListener("click", () => {
  movieForm.classList.toggle("hidden");
});

saveMovieBtn.addEventListener("click", () => {
  // Post
  form.reset();
});

// Movies by genre
// TODO: populate by genre dynamically so all genres are shown

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
    makeListFeatured(movies);
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

// Implement functionality to increase/decrease ratings

// mouseOver animation for movie boxes

// function rateMovie(movieTitle) {
//   alert('Rating "' + movieTitle + '"...');
// }
