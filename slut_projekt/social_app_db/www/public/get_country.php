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

include_once('../model/dbFunctions.php');
$db = connectToDb();

$input = $_GET['input'];
$result = getCountries($db, $input);

header('Content-Type: application/json');

// Gör om arrayen till en array med json-objekt
echo json_encode($result, JSON_UNESCAPED_UNICODE);
