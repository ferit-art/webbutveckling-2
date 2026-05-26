<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// The browser sends a "Preflight" OPTIONS request to check permissions
// before sending the real POST data.
// The sever must answer "OK" and exit before running the database logic.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { //  Browser's test request
    http_response_code(200);
    exit;
}

session_start();
header('Access-Control-Allow-Credentials: true'); //    Browser cookie security problem solution
header('Content-Type: application/json; charset=utf-8');

if (isset($_SESSION['uid'])) {

    $firstname = "";
    if (isset($_SESSION['firstname'])) {
        $firstname = $_SESSION['firstname'];
    }

    $surname = "";
    if (isset($_SESSION['surname'])) {
        $surname = $_SESSION['surname'];
    }

    $country_code = "";
    if (isset($_SESSION['country_code'])) {
        $country_code = $_SESSION['country_code'];
    }

    echo json_encode([
        "isLoggedIn" => true, 
        "username" => $_SESSION['username'], 
        "uid" => $_SESSION['uid'],
        "firstname" => $firstname,
        "surname" => $surname,
        "country_code" => $country_code
    ]);
} else {
    echo json_encode(["isLoggedIn" => false]);
}
