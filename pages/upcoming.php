<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../styles/main.css" />
    <title>Ближайшие премьеры</title>
</head>

<body>
    <header>
        <div class="container">
            <div class="logo">
                Film<img src="../img/like.svg" alt="heart" />Mania
            </div>
            <menu>
                <li><a href="../index.php">Главная</a></li>
                <li><a href="./now-playing.php">Сейчас в прокате</a></li>
                <li><a href="./popular.php">Популярные</a></li>
                <li><a href="./top-rated.php">Топы Рейтинга</a></li>
                <li><a href="./upcoming.php">Ближайшие премьеры</a></li>
            </menu>
        </div>
    </header>
    <main>
        <div class="container">
            <section class="movies-block">
                <h2>Ближайшие премьеры</h2>
                <ul id="upcoming"></ul>
                <div class="list-url">
                    <a onclick="onLoadMore()">смотреть ещё</a>
                </div>
            </section>
        </div>
    </main>
    <footer>
        <div class="container">
            (C) Сайт Максименко Юлии
        </div>
    </footer>

    <script src="../scripts/upcoming.js"></script>
</body>

</html>