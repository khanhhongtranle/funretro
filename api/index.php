<?php
header("Access-Control-Allow-Origin: *");

require_once 'jwtHelper.php';
require_once 'db.php';
$config = include 'config.php';
global $db;
$db = new db($config['db']['host'], $config['db']['user'], $config['db']['pass'], $config['db']['dbname']);

/**
 * check user had login, if login api will send include token
 */
if (!in_array($_GET['action'], array('login', 'signup', 'loginGoogle', 'loginFacebook'))) {
    if (empty($_POST['token']) || decodeToken($_POST['token']) === false) {
        responseJson(array('success' => 0, 'message' => 'invalid token'));
    }
}

/**
 * routers
 */
switch ($_GET['action']) {
    case 'login':
        login();
        break;
    case 'checkToken':
        checkToken();
        break;
    case 'getBoards':
        getBoards();
        break;
    case 'getBoardDetail':
        getBoardDetail();
        break;
    case 'signup':
        signup();
        break;
    case 'getUserInfo':
        getUserInfo();
        break;
    case 'updateUserPassword':
        updateUserPassword();
        break;
    case 'updateUserInfo':
        updateUserInfo();
        break;
    case 'saveBoard':
        saveBoard();
        break;
    case 'deleteBoard':
        deleteBoard();
        break;
    case 'editBoard':
        editBoard();
        break;
    case 'addCard':
        addCard();
        break;
    case 'deleteCard':
        deleteCard();
        break;
    case 'getCard':
        getCard();
        break;
    case 'updateCard':
        updateCard();
        break;
    case 'loginGoogle':
    case 'loginFacebook':
        loginGoogle();
        break;
    case 'shareBoard':
        shareBoard();
        break;
    case 'getsharedEmails':
        getsharedEmails();
        break;
    case 'getSharedBoards':
        getSharedBoards();
        break;
    case 'moveCard':
        moveCard();
        break;
    default:
        notFound();
        break;
}

function login()
{
    global $db;
    $res = $db->query("select * from users where username='{$_POST['username']}'")->fetchAll();
    if (count($res) > 0) {
        $user = $res[0];
        if (md5($_POST['password']) == $user['hash_pass']) {
            responseJson(array(
                'success' => 1,
                'token' => getToken($user),
                'user_id' => $user['id']
            ));
        }
    }
    responseJson(array(
        'success' => 0
    ));
}

function loginGoogle()
{
    global $db;
    $res = $db->query("select * from users where username='{$_POST['username']}'")->fetchAll();
    if (count($res) > 0) {
        $user = $res[0];
        responseJson(array(
            'success' => 1,
            'token' => getToken($user),
            'user_id' => $user['id']
        ));
    } else {
        $pass = md5('123456');
        $db->query("insert into users(username,hash_pass, email, first_name, last_name)
                                values( '{$_POST['username']}', '{$pass}', '{$_POST['email']}', '{$_POST['first_name']}', '{$_POST['last_name']}' )");
        $res = $db->query("select * from users where username='{$_POST['username']}'")->fetchAll();
        $user = $res[0];
        responseJson(array(
            'success' => 1,
            'token' => getToken($user),
            'user_id' => $user['id']
        ));
    }
    responseJson(array(
        'success' => 0
    ));
}

function notFound()
{
    ob_clean();
    echo json_encode(array(
        'success' => 0,
        'message' => 'not found'
    ));
    exit();
}

function responseJson($data)
{
    ob_clean();
    echo json_encode($data);
    exit();
}

function checkToken()
{
    if (decodeToken($_POST['token']) !== false) {
        responseJson(array('success' => 1));
    } else {
        responseJson(array('success' => 0));
    }
}

function getBoards()
{
    $un_id = $_POST['user_id'];

    global $db;
    $data = $db->query("select * from boards where user_id = '{$un_id}' ")->fetchAll();
    responseJson(array('success' => 1, 'data' => $data));
}

function getBoardDetail()
{

    $board_id = $_POST['board_id'];

    global $db;
    $data['board_name'] = $db->query("select board_name from boards where id='{$board_id}'")->fetchAll();
    $data['board_name'] = $data['board_name'][0]['board_name'];

    $data['board_details'] = $db->query("select * from board_detail where board_id = '{$board_id}' ")->fetchAll();
    responseJson(array('success' => 1, 'data' => $data));
}

//function getBoardUpdate()
//{
//    global $db;
//    $db->query("update board_detail set title = '{$_POST['title']}', description = '{$_POST['description']}' where id = '{$_POST['card_id']}'");
//    responseJson(array('success' => 1, 'data' => array(
//        'title' => $_POST['title'],
//        'id' => $_POST['card_id'],
//        'description' => $_POST['description']
//    )));
//}

function signup()
{
    $username = $_POST['username'];
    $password = md5($_POST['password']);
    $email = $_POST['email'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];

    global $db;

    $data_user = $db->query("select * from users where  username = '{$username}' ")->fetchAll();
    if (count($data_user) > 0) {
        responseJson(array('success' => 0));
    }

    $db->query("insert into users(username,hash_pass, email, first_name, last_name)
                values( '{$username}', '{$password}', '{$email}', '{$firstname}', '{$lastname}' )");

    responseJson(array('success' => 1));
}

function getUserInfo()
{
    $id = $_POST['user_id'];

    global $db;

    $data = $db->query("select * from users where id = '{$id}'")->fetchAll();
    $data = $data[0];

    responseJson(array('success' => 1, 'data' => $data));
}

function updateUserInfo()
{
    global $db;
    $data['change_pass'] = 0;
    $db->query("update users set email='{$_POST['email']}', 
                 first_name='{$_POST['firstname']}', 
                 last_name='{$_POST['lastname']}'
                 where username='{$_POST['username']}'");


    responseJson(array('success' => 1, 'data' => $data));
}

function updateUserPassword(){
    global  $db;

    if (!empty($_POST['old_password']) && !empty($_POST['new_password'])) {
        //kiểm tra old password
        $res = $db->query("select * from users where username='{$_POST['username']}'")->fetchAll();
        if (count($res) > 0) {
            $user = $res[0];
            if (md5($_POST['old_password']) == $user['hash_pass']) {
                //md5 new password
                $pass = md5($_POST['new_password']);
                $db->query("update users set hash_pass='{$pass}' where username='{$_POST['username']}'");
                $data['change_pass'] = 1;
            } else {
                $data['old_pass_not_valid'] = 1;
            }
        }
    }

    responseJson(array('success' => 1, 'data' => $data));
}

function saveBoard()
{
    global $db;
    $now = date("Y-m-d");
    $db->query("insert into boards(board_name,user_id, date_created, share_url)
                values( '{$_POST['board_name']}', '{$_POST['user_id']}','{$now}','')");

    $data = $db->query("select * from boards where user_id = '{$_POST['user_id']}' ")->fetchAll();

    responseJson(array('success' => 1, 'data' => $data));
}

function deleteBoard()
{
    global $db;
    $db->query("delete from boards where id='{$_POST['id']}'");

    $data = $db->query("select * from boards where user_id = '{$_POST['user_id']}' ")->fetchAll();

    responseJson(array('success' => 1, 'data' => $data));
}

function editBoard()
{
    global $db;
    $db->query("update boards set board_name='{$_POST['board_name']}' 
                 where id='{$_POST['board_id']}'");

    responseJson(array('success' => 1));
}

function addCard()
{
    global $db;
    $db->query("insert into board_detail(board_id, description, title, type)  values ('{$_POST['board_id']}', '{$_POST['description']}', '{$_POST['title']}' , '{$_POST['type']}')");

    //send event update board to other user
    require_once 'socket.io.class.php';
    $socket = new SocketIO('localhost', '3002');
    $socket->send(array(
        'board_id' => $_POST['board_id']
    ));
    //end

    responseJson(array('success' => 1));
}


function deleteCard()
{
    global $db;
    $db->query("delete from board_detail where id = '{$_POST['card_id']}'");

    //send event update board to other user
    require_once 'socket.io.class.php';
    $socket = new SocketIO('localhost', '3002');
    $socket->send(array(
        'board_id' => $_POST['board_id']
    ));
    //end

    responseJson(array('success' => 1));
}

function getCard()
{
    global $db;
    $data = $db->query("select * from board_detail where id = {$_POST['card_id']}")->fetchAll();
    responseJson(array('success' => 1,
        'data' => $data));
}

function updateCard()
{
    global $db;
    $db->query("update board_detail set title = '{$_POST['title']}', description = '{$_POST['description']}' where id = '{$_POST['card_id']}'");

    //send event update board to other user
    require_once 'socket.io.class.php';
    $socket = new SocketIO('localhost', '3002');
    $socket->send(array(
        'board_id' => $_POST['board_id']
    ));
    //end

    responseJson(array('success' => 1, 'data' => array(
        'title' => $_POST['title'],
        'id' => $_POST['card_id'],
        'description' => $_POST['description']
    )));
}

function shareBoard()
{
    $email_string = preg_split("/[\s,]+/", $_POST['emails']);
    global $db;

    $db->query("delete from share_boards where board_id = '{$_POST['board_id']}'");

    foreach ($email_string as $email) {
        if (strtolower($email) == 'all') {
            $db->query("insert into share_boards(board_id, email) values ( '{$_POST['board_id']}' , 'all' )");
        } else if (!empty($email)) {
            $db->query("insert into share_boards(board_id, email) values ( '{$_POST['board_id']}' , '$email' )");
        }
    }

    responseJson(array(
        'success' => 1,
    ));
}

function getsharedEmails()
{
    global $db;
    $res = $db->query("select email from share_boards where board_id = '{$_POST['board_id']}'")->fetchAll();
    $emails = '';
    foreach ($res as $item) {
        $emails .= $item['email'] . "\n";
    }
    responseJson(array(
        'success' => 1,
        'data' => $emails
    ));
}

function getSharedBoards()
{
    global $db;

    $res = $db->query("select b.board_name, b.date_created, b.id , us2.username
                                from users
                                         inner join share_boards sb on users.email = sb.email
                                         inner join boards b on sb.board_id = b.id
                                         inner join users us2 on us2.id = b.user_id
                                where users.id = '{$_POST['user_id']}'
                                union
                                select b.board_name, b.date_created, b.id, us2.username
                                from users
                                         inner join share_boards sb on sb.email = 'all'
                                         inner join boards b on sb.board_id = b.id
                                         inner join users us2 on us2.id = b.user_id 
                                         and us2.id <> users.id
                                where users.id = '{$_POST['user_id']}'")->fetchAll();

    responseJson(array(
        'success' => 1,
        'data' => $res
    ));
}

function moveCard()
{
    global $db;
    $db->query("update board_detail set type = '{$_POST['new_type']}' where  id = '{$_POST['card_id']}'");

    //send event update board to other user
    require_once 'socket.io.class.php';
    $socket = new SocketIO('localhost', '3002');
    $socket->send(array(
        'board_id' => $_POST['board_id']
    ));
    //end

    responseJson(array(
        'success' => 1
    ));
}
