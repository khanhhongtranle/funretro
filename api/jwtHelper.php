<?php

use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;

require_once 'vendor/autoload.php';
function getToken($payload)
{
    $config = include 'config.php';
    return JWT::encode($payload, $config['jwt_token_key']);
}

function decodeToken($tokenString)
{
    $config = include 'config.php';
    try {
        $result = JWT::decode($tokenString, $config['jwt_token_key'], array('HS256'));
    } catch (SignatureInvalidException $e) {
        return false;
    } catch (BeforeValidException $e) {
        return false;
    } catch (ExpiredException $e) {
        return false;
    } catch (UnexpectedValueException $e) {
        return false;
    }catch (DomainException $e) {
        return false;
    }
    return json_decode(json_encode($result), true);
}
