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
if (!in_array($_GET['action'], array('login', 'register'))) {
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
                'token' => getToken($user)
            ));
        }
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
