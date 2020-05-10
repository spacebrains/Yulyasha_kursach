<?php

require_once 'connection.php'; // подключаем скрипт
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database)
    or die("Ошибка " . mysqli_error($link));

//данные для удаления из бд
$json = file_get_contents('php://input');
$logPostData = json_decode($json, true);

$ID = $logPostData['ID'];

// выполняем операции с базой данных
$query = "DELETE FROM films WHERE ID = $ID";
$result = mysqli_query($link, $query);
if ($result) {
    header("HTTP/1.1 200 Ok");
} else {
    header("HTTP/1.1 304 Not Modified");
}

// закрываем подключение
mysqli_close($link);
