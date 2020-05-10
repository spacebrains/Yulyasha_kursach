const IMG_URl = "https://image.tmdb.org/t/p/w500/";

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
    const scale = document.createElement("div");
    scale.className = "scale";
    const rate = document.createElement("div");
    rate.className = "rate";
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

    // addButton
    const addButton = document.createElement("button");
    addButton.className = "add_button";
    addButton.innerText = "удалить из просмотренных";
    addButton.onclick = async () => {
        const movieRequest = {
            ID: movieData.id,
        };
        console.log(JSON.stringify(movieRequest));

        const response = await fetch("../handlers/deleteMovieFromDB.php", {
            method: "POST",
            body: JSON.stringify(movieRequest),
        });

        if (response.status === 200) {
            location.href = location.href;
        }
    };
    movie.append(addButton);

    return movie;
};

getAndInsertMovies = async (movies, id) => {
    const arrayElements = movies.map((movieData) =>
        createMovieBlock(movieData)
    );

    const ul = document.getElementById(id);
    arrayElements.forEach((element) => {
        ul.append(element);
    });
};

clearMovies = (id) => {
    const ul = document.getElementById(id);
    ul.innerHTML = "";
};

getAndInsertMovies(window.favorite, "favorite");
