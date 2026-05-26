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

include_once('../model/dbFunctions.php');
$db = connectToDb();

$json = file_get_contents('php://input');
$chosenCountry = json_decode($json, true);

$response = changeUserFlag($db, $_SESSION['uid'], $chosenCountry);

if ($response === true) {
    $_SESSION['country_code'] = $chosenCountry;
}


echo json_encode($response, JSON_UNESCAPED_UNICODE);
