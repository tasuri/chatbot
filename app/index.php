<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With');

include_once 'MessageHandler.php';

$index = intval($_GET['index']);

$msgHandler = new MessageHandler($index);
$msgHandler->answerMessage();