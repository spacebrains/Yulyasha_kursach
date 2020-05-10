const UPCOMING_URL =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=57f28580932896b3e3c54cd033265039&language=ru-Ru";

const IMG_URl = "https://image.tmdb.org/t/p/w500/";

let page = 1;

const getMovies = async (url) => {
    const response = await fetch(url + page);
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
    const arrayElements = arrayMovies.map((movieData) =>
        createMovieBlock(movieData)
    );

    const ul = document.getElementById(id);
    arrayElements.forEach((element) => {
        ul.append(element);
    });
};

getAndInsertMovies(UPCOMING_URL, "upcoming");

const onLoadMore = () => {
    page = page + 1;
    getAndInsertMovies(UPCOMING_URL, "upcoming");
};
