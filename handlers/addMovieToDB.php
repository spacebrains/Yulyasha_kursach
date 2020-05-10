<?php

require_once 'connection.php'; // подключаем скрипт
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database)
    or die("Ошибка " . mysqli_error($link));

//данные для добавления в бд
$json = file_get_contents('php://input');
$logPostData = json_decode($json, true);

$ID = $logPostData['ID'];
$Title = $logPostData['Title'];
$Backdrop = $logPostData['Backdrop'];
$Vote_average = $logPostData['Vote_average'];
$Popularity = $logPostData['Popularity'];

// выполняем операции с базой данных
$query = "INSERT INTO `films` (`ID`,`Title`,`Backdrop`,`Vote_average`,`Popularity`) VALUES($ID, '$Title', '$Backdrop', '$Vote_average', '$Popularity')";
$result = mysqli_query($link, $query);
if ($result) {
    header("HTTP/1.1 200 Ok");
} else {
    header("HTTP/1.1 304 Not Modified");
}

// закрываем подключение
mysqli_close($link);
