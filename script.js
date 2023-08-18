// Global variables

const addMovieBtn = document.getElementById("addMovieBtn");
const movieForm = document.getElementById("movieForm");

// Featured section
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

const movieFormField = document.getElementById("movieFormField");

movieFormField.addEventListener("submit", (event) => {
  event.preventDefault();

  // Grab form inputs
  const newMovie = {
    viewRatings: parseFloat(event.target.viewRatingsInput.value),
    poster: event.target.posterInput.value,
    movieName: event.target.movieNameInput.value,
    actors: event.target.actorsInput.value.split(", "),
    description: event.target.descriptionInput.value,
    genre: event.target.genreInput.value.split(", "),
  };

  // Post inputs using fetch
  fetch("http://localhost:3000/moviesDB", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  })
    .then((response) => {
      if (response.ok) {
        renderNewMovie(newMovie);
        movieFormField.reset();
        alert("Movie added successfully!");
      } else {
        alert("Error adding movie. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error adding movie:", error);
    });

  const renderNewMovie = (newMovie) => {
    newMovie.genre.forEach((genre) => {
      const genres = genre.split(", ").map((g) => g.toLowerCase());
      genres.forEach((g) => {
        const genreSection = document.querySelector(`#${g} .movie-row`);
        if (genreSection !== null) renderMovie(newMovie, genreSection);
      });
      renderNewMovie(newMovie);
    });
  };
});

// Movies by genre
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

  /* mouseOver animations for movie boxes. code here since movieBox created here. */

  movieBox.addEventListener("mouseenter", (event) => {
    console.log("Mouse entered movie box");
    movieBox.style.outline = "4px dotted #888";
    movieBox.style.transition = "outline 0.2s";
  });

  movieBox.addEventListener("mouseleave", (event) => {
    console.log("Mouse left movie box");
    movieBox.style.outline = "";
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
