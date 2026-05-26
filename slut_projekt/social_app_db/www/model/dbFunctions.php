<?php

/**
 * Anluter till databasen och returnerar ett PDO-objekt
 * @return PDO  Objektet som returneras
 */
function connectToDb()
{
    // Definierar konstanter med användarinformation.
    define('DB_USER', 'admin_user');
    define('DB_PASSWORD', '12345');
    define('DB_HOST', 'mariadb'); // mariadb om docker annars localhost
    define('DB_NAME', 'egytalk');

    // Skapar en anslutning till MySql och databasen egytalk
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8';
    $db = new PDO($dsn, DB_USER, DB_PASSWORD);

    return $db;
}

function addUser($db, $username, $password, $firstname, $surname)
{
    if (isset($firstname, $surname, $username, $password)) {

        $fname = filter_var($firstname, FILTER_SANITIZE_SPECIAL_CHARS);
        $sname = filter_var($surname, FILTER_SANITIZE_SPECIAL_CHARS);
        $user = filter_var($username, FILTER_SANITIZE_SPECIAL_CHARS);
        $pwd = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $db->prepare("INSERT INTO user(uid, firstname, surname, username, password, country_code) VALUES(UUID(), :fn, :sn,:user,:pwd,:country)");

        $stmt->bindValue(":fn", $fname);
        $stmt->bindValue(":sn", $sname);
        $stmt->bindValue(":user", $user);
        $stmt->bindValue(":pwd", $pwd);
        $stmt->bindValue(":country", "SE");

        try {
            $stmt->execute();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}

function updateUser($db, $uid, $username, $firstname, $surname)
{
    if (isset($username, $firstname, $surname)) {

        $fname = filter_var($firstname, FILTER_SANITIZE_SPECIAL_CHARS);
        $sname = filter_var($surname, FILTER_SANITIZE_SPECIAL_CHARS);
        $user = filter_var($username, FILTER_SANITIZE_SPECIAL_CHARS);

        $stmt = $db->prepare("UPDATE `user` SET `firstname`=:fname,`surname`=:sname,`username`=:user WHERE uid LIKE :uid");

        $stmt->bindValue(":fname", $fname);
        $stmt->bindValue(":sname", $sname);
        $stmt->bindValue(":user", $user);
        $stmt->bindValue(":uid", $uid);



        try {
            $stmt->execute();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
/**
 * Hämtar alla status-uppdateringar i tabellen post
 *
 * @param $db PDO-objekt
 * @return array med alla status-uppdateringar
 */
function getAllPosts($db)
{
    $sql = "SELECT post.*, user.firstname, user.surname, user.username FROM post NATURAL JOIN user ORDER BY post.date LIMIT 0,30";

    /* Kör frågan mot databasen egytalk och tabellen post */
    $stmt = $db->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getCountries($db, $input)
{

    if (isset($input)) {
        $sql = "SELECT country.* FROM country WHERE Name LIKE :input";

        $stmt = $db->prepare($sql);

        $stmt->bindValue(":input", "$input%");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

function getAllUsers($db)
{
    $sql = "SELECT user.* FROM user ORDER BY username ASC";

    $stmt = $db->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function changeUserFlag($db, $uid, $flag)
{
    if (isset($uid, $flag)) {

        $stmt = $db->prepare("UPDATE `user` SET `country_code`=:country WHERE uid LIKE :uid");

        $stmt->bindValue(":country", $flag);
        $stmt->bindValue(":uid", $uid);

        try {
            $stmt->execute();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}

function getUserFromUid($db, $uid)
{
    $sql = "SELECT username FROM user WHERE uid LIKE ?";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(1, "$uid", PDO::PARAM_STR);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getUidFromUsername($db, $username)
{
    $sql = "SELECT uid FROM user WHERE username LIKE ?";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(1, "$username", PDO::PARAM_STR);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getPostsFromUid($db, $uid)
{
    $sql = "SELECT post.*, user.firstname, user.surname, user.username FROM post JOIN user ON post.uid = user.uid WHERE post.uid LIKE ? ORDER BY post.date";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(1, "$uid%", PDO::PARAM_STR);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getPostsWithCommentsFromUid($db, $uid)
{
    $sql = "SELECT 
            post.pid,
            post.post_txt,
            post.date,
            post.uid           AS post_uid,
            post_user.username AS post_username,
            comment.cid,
            comment.comment_txt,
            comment_user.username AS comment_username
        FROM post
        JOIN user AS post_user ON post.uid = post_user.uid
        LEFT JOIN comment ON post.pid = comment.pid
        LEFT JOIN user AS comment_user ON comment.uid = comment_user.uid
        WHERE post.uid = ?
        ORDER BY post.date DESC, comment.date ASC";

    $stmt = $db->prepare($sql);
    $stmt->bindValue(1, $uid, PDO::PARAM_STR);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];

    foreach ($rows as $row) {

        if (!isset($result[$row['pid']])) {
            $result[$row['pid']] = [
                'pid' => $row['pid'],
                'post_txt' => $row['post_txt'],
                'date' => $row['date'],
                'sender' => [
                    'username' => $row['post_username'],
                    'uid' => $row['post_uid']
                ],
            ];
        }

        if ($row['cid'] !== null) {
            $result[$row['pid']]['comments'][] = [
                'cid' => $row['cid'],
                'sender' => $row['comment_username'],
                'comment_txt' => $row['comment_txt']
            ];
        }
    }
    return array_values($result);
}

function getAllPostsWithComments($db)
{
    $sql = "SELECT 
            post.pid           AS post_pid,
            post.uid           AS post_uid,
            post.post_txt,
            post.date          AS post_date,
            post_user.firstname AS post_firstname,
            post_user.surname AS post_surname,
            comment.cid,
            comment.pid,
            comment.uid        AS comment_uid,
            comment.comment_txt,
            comment.date       AS comment_date,
            comment_user.firstname AS comment_firstname,
            comment_user.surname AS comment_surname
        FROM post
        JOIN user AS post_user ON post.uid = post_user.uid
        LEFT JOIN comment ON post.pid = comment.pid /* => Only include rows from the comment table where the pid matches the current post’s pid */
        LEFT JOIN user AS comment_user ON comment.uid = comment_user.uid /* => Same as above but it is for the uid now */
        ORDER BY post.date DESC, comment.date ASC";

    $stmt = $db->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];

    foreach ($rows as $row) {

        if (!isset($result[$row['post_pid']])) {
            $result[$row['post_pid']] = [
                'pid' => $row['post_pid'],
                'post_txt' => $row['post_txt'],
                'date' => $row['post_date'],
                'sender' => [
                    'firstname' => $row['post_firstname'],
                    'surname' => $row['post_surname'],
                    'uid' => $row['post_uid'],
                    'date' => $row['post_date']
                ],
            ];
        }

        if ($row['cid'] !== null) {
            $result[$row['post_pid']]['comments'][] = [
                'cid' => $row['cid'],
                'firstname' => $row['comment_firstname'],
                'surname' => $row['comment_surname'],
                'comment_txt' => $row['comment_txt'],
                'date' => $row['comment_date']
            ];
        }
    }
    return array_values($result);
}

function checkUser($db, $username, $password)
{
    if (isset($username, $password)) {
        $user = filter_var($username, FILTER_SANITIZE_SPECIAL_CHARS);

        $stmt = $db->prepare("SELECT * FROM user WHERE username = :user");

        $stmt->bindValue(":user", $user);

        $stmt->execute();

        try {
            if ($stmt->rowCount() == 1) {

                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if (password_verify($password, $user['password'])) {

                    return [$username, $user['uid'], $user['firstname'], $user['surname'], $user['country_code']];
                } else {
                    return false;
                }
            } else {

                return false;
            }
        } catch (Exception $e) {

            return false;
        }
    }
}

function addPost($db, $uid, $text)
{
    $cleanText = filter_var($text, FILTER_SANITIZE_SPECIAL_CHARS);

    $sql = "INSERT INTO post (uid, post_txt) VALUES (:uid, :txt)";
    $stmt = $db->prepare($sql);

    $stmt->bindValue(':uid', $uid);
    $stmt->bindValue(':txt', $cleanText);

    return $stmt->execute();
}

function addComment($db, $uid, $pid, $text)
{
    $cleanText = filter_var($text, FILTER_SANITIZE_SPECIAL_CHARS);

    $sql = "INSERT INTO comment (uid, pid, comment_txt) VALUES (:uid, :pid, :txt)";
    $stmt = $db->prepare($sql);

    $stmt->bindValue(':uid', $uid);
    $stmt->bindValue(':pid', $pid);
    $stmt->bindValue(':txt', $cleanText);

    return $stmt->execute();
}

function getMessagesBetweenUsers($db, $myUid, $partnerUid)
{
    $sql = "SELECT message.*, sender.username AS sender_username, receiver.username AS receiver_username 
            FROM message
            JOIN user sender ON message.sender_uid = sender.uid
            JOIN user receiver ON message.receiver_uid = receiver.uid
            WHERE (message.sender_uid = :me AND message.receiver_uid = :partner) 
               OR (message.sender_uid = :partner AND message.receiver_uid = :me)
            ORDER BY message.date ASC";

    $stmt = $db->prepare($sql);
    $stmt->bindValue(':me', $myUid, PDO::PARAM_STR);
    $stmt->bindValue(':partner', $partnerUid, PDO::PARAM_STR);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


function sendMessage($db, $sender_uid, $receiver_uid, $message_txt)
{
    $cleanText = filter_var($message_txt, FILTER_SANITIZE_SPECIAL_CHARS);

    $sql = "INSERT INTO `message`(`sender_uid`, `receiver_uid`, `message_txt`) VALUES (:sender, :receiver, :msg)";
    $stmt = $db->prepare($sql);

    $stmt->bindValue(':sender', $sender_uid);
    $stmt->bindValue(':receiver', $receiver_uid);
    $stmt->bindValue(':msg', $cleanText);

    return $stmt->execute();
}
