<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../styles/main.css" />
    <title>Просмотренное</title>
</head>

<body>
    <header>
        <div class="container">
            <div class="logo">
                <a href="../index.php">
                    Film<img src="../img/like.svg" alt="heart" />Mania
                </a>
            </div>
            <menu>
                <li><a href="../index.php">Главная</a></li>
                <li><a href="./now-playing.html">Сейчас в прокате</a></li>
                <li><a href="./popular.html">Популярные</a></li>
                <li><a href="./top-rated.html">Топ Рейтинга</a></li>
                <li><a href="./upcoming.html">Ближайшие премьеры</a></li>
                <li><a href="./favorite.php">Просмотренное</a></li>
            </menu>
        </div>
    </header>
    <main>
        <div class="container">
            <section class="movies-block">
                <h2>Просмотренное</h2>
                <ul id="favorite"></ul>
            </section>
        </div>
    </main>
    <footer>
        <div class="container">
            (C) Сайт Максименко Юлии
        </div>
    </footer>

    <?php
    require_once '../handlers/connection.php'; // подключаем скрипт
    // подключаемся к серверу
    $link = mysqli_connect($host, $user, $password, $database);

    // выполняем операции с базой данных
    $query = "SELECT * FROM films";
    $result = mysqli_query($link, $query);
    $rows = mysqli_num_rows($result); // количество полученных строк

    if ($result) {
        echo "<script>";
        echo "window.favorite = [];";

        $i = 0;
        while ($row = mysqli_fetch_row($result)) {
            echo "window.favorite[$i] = {};
                  window.favorite[$i].id = '$row[0]';
                  window.favorite[$i].title = '$row[1]';
                  window.favorite[$i].backdrop_path = '$row[2]';
                  window.favorite[$i].vote_average = '$row[3]';
                  window.favorite[$i].popularity = '$row[4]';";
            $i++;
        }
        echo "</script>";
    }

    // закрываем подключение
    mysqli_close($link);
    ?>
    <script src="../scripts/favorite.js"></script>
</body>

</html>