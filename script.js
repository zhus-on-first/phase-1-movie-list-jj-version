//TODO: watchlist, favorites, filter, search

// Global variables

const addMovieBtn = document.getElementById("addMovieBtn");
const movieForm = document.getElementById("movieForm");

// Fetch data for featured and genre sections

fetch("http://localhost:3000/moviesDB")
  .then((response) => response.json())
  .then((movies) => {
    makeList(movies);
    makeListFeatured(movies);
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

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
//TODO close add movie form with click anywhere else

addMovieBtn.addEventListener("click", () => {
  movieForm.classList.toggle("hidden");
});

// TODO add form validationsaveMovieBtn.addEventListener("click", () => {})
movieForm.addEventListener("submit", (event) => {
  event.preventDefault();

  form.reset();
});

// Movies by genre
// TODO: populate by genre dynamically so all genres are shown alphabetically

const renderMovie = (movie, genreSection) => {
  console.log("Rendering movie:", movie.movieName);
  const movieBox = document.createElement("div");
  movieBox.className = "movie-box";
  movieBox.innerHTML = `
    <img src="${movie.poster}" alt="${movie.movieName}" />
    <h3 class="movie-name">${movie.movieName}</h3>
    <p class="movie-rating">Rating: ${movie.viewRatings}</p>
  `;
  genreSection.appendChild(movieBox);

  /* mouseOver animations for movie boxes */
  //TODO not have lower elements repositioned

  movieBox.addEventListener("mouseenter", (event) => {
    console.log("Mouse entered movie box");
    event.target.style.outline = "5px dotted orange";
  });

  movieBox.addEventListener("mouseleave", (event) => {
    console.log("Mouse left movie box");
    event.target.style.outline = "";
  });
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

// TODO: Implement functionality to increase/decrease ratings

// function rateMovie(movieTitle) {
//   alert('Rating "' + movieTitle + '"...');
// }
