const NOW_PLAYING_URL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=57f28580932896b3e3c54cd033265039&language=ru-Ru";
const POPULAR_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=57f28580932896b3e3c54cd033265039&language=ru-Ru";
const TOP_RATED_URL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=57f28580932896b3e3c54cd033265039&language=ru-Ru";
const UPCOMING_URL =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=57f28580932896b3e3c54cd033265039&language=ru-Ru";

const IMG_URl = "https://image.tmdb.org/t/p/w500/";

const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;
    console.log(movies);
    return movies;
};

const createMovieBlock = (movieData) => {
    const movie = document.createElement("li");
    movie.className = "movie";

    // backdrop
    let img;
    if (movieData.backdrop_path !== null) {
        img = document.createElement("img");
        img.setAttribute("src", IMG_URl + movieData.backdrop_path);
    } else {
        img = document.createElement("div");
    }
    img.className = "backdrop";
    movie.append(img);

    // vote_average
    if (!!movieData.vote_average) {
        const scale = document.createElement("div");
        scale.className = "scale";
        const rate = document.createElement("div");
        rate.className = "rate";
        rate.style.width = movieData.vote_average * 10 + "%";
        scale.append(rate);
        movie.append(scale);
    }

    // title
    const title = document.createElement("h3");
    title.className = "title";
    title.innerText = movieData.title;
    movie.append(title);

    // popularity
    const popularity = document.createElement("span");
    popularity.className = "popularity";
    popularity.innerText = movieData.popularity + " смотрит";
    movie.append(popularity);

    // addButton
    const addButton = document.createElement("button");
    addButton.className = "add_button";
    addButton.innerText = "добавить в избранное";
    addButton.onclick = async () => {
        const movieRequest = {
            ID: movieData.id,
            Title: movieData.title,
            Backdrop: movieData.backdrop_path,
            Vote_average: movieData.vote_average,
            Popularity: movieData.popularity,
        };
        console.log(JSON.stringify(movieRequest));

        const response = await fetch("../handlers/addMovieToDB.php", {
            method: "POST",
            body: JSON.stringify(movieRequest),
        });

        if (response.status === 200) {
            alert("Фильм добавлен в избранное");
        } else {
            alert("Фильм уже существует в избранном");
        }
    };
    movie.append(addButton);

    return movie;
};

getAndInsertMovies = async (url, id) => {
    const arrayMovies = await getMovies(url);
    arrayMovies.length = 8;
    const arrayElements = arrayMovies.map((movieData) =>
        createMovieBlock(movieData)
    );

    const ul = document.getElementById(id);
    arrayElements.forEach((element) => {
        ul.append(element);
    });
};

const initialization = async () => {
    await getAndInsertMovies(NOW_PLAYING_URL, "now-playing");
    await getAndInsertMovies(POPULAR_URL, "popular");
    await getAndInsertMovies(TOP_RATED_URL, "top-rated");
    await getAndInsertMovies(UPCOMING_URL, "upcoming");
};

initialization();
