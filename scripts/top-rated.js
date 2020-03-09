const TOP_RATED_URL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=57f28580932896b3e3c54cd033265039&language=ru-Ru&page=";
const IMG_URl = "https://image.tmdb.org/t/p/w500/";

let page = 1;

const getMovies = async url => {
    const response = await fetch(url + page);
    const data = await response.json();
    const movies = data.results;
    console.log(movies);
    return movies;
};

const createMovieBlock = movieData => {
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
    const scale = document.createElement("div");
    scale.className = "scale";
    const rate = document.createElement("div");
    rate.className = "scale";
    rate.style.width = movieData.vote_average * 10 + "%";
    scale.append(rate);
    movie.append(scale);

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

    return movie;
};

getAndInsertMovies = async (url, id) => {
    const arrayMovies = await getMovies(url);
    const arrayElements = arrayMovies.map(movieData =>
        createMovieBlock(movieData)
    );

    const ul = document.getElementById(id);
    arrayElements.forEach(element => {
        ul.append(element);
    });
};

getAndInsertMovies(TOP_RATED_URL, "top-rated");

const onLoadMore = () => {
    page = page + 1;
    getAndInsertMovies(TOP_RATED_URL, "top-rated");
};
