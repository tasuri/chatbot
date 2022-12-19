<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if($_GET['message'] == "Hallo!") {
    echo "Hello. :)";
} else if($_GET['message'] == "Guten Tag.") {
    echo "Nein.";
} else {
    echo "Falsche Antwort";
}