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

if (!isset($_SESSION['uid'])) {
    echo json_encode(['success' => false, "message" => "Unauthorized..."]);
    exit;
}

include_once('../model/dbFunctions.php');
$db = connectToDb();

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$response = false;

if (!empty(trim($data['comment_txt']))) {

    $uid = $_SESSION['uid'];
    $pid = $data['post_id'];
    $comment_text = $data['comment_txt'];
    $success = addComment($db, $uid, $pid, $comment_text);

    if ($success) {
        $response = true;
    }
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response, JSON_UNESCAPED_UNICODE);
