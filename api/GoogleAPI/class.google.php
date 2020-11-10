<?php
require_once dirname(__FILE__) . '/vendor/autoload.php';

class PHPGoogle
{
    public $client;
    public $accessToken;
    public $log = array();

    function __construct()
    {
        $this->client = new Google_Client();
        $this->client->setApplicationName('Google API PHP');
        $this->client->setAuthConfig(dirname(__FILE__) . '/client_secret.json');
    }

    /**
     * @param string $authorCode
     */
    function setAuthorCode($authorCode)
    {
        $this->accessToken = json_encode($this->client->fetchAccessTokenWithAuthCode($authorCode));
    }

    /**
     * @param string $accessToken
     */
    function setAccessToken($accessToken)
    {
        $this->accessToken = $accessToken;
        $this->client->setAccessToken($this->accessToken);
        if ($this->client->isAccessTokenExpired()) {
            $this->accessToken = json_encode($this->client->fetchAccessTokenWithRefreshToken($this->client->getRefreshToken()));
        }
        return $this->accessToken;
    }

    /**
     * @param array $scopes
     * @return string
     * @link https://developers.google.com/identity/protocols/googlescopes
     */
    static function getLinkToGetAuthorCode(array $scopes)
    {
        $client = new Google_Client();
        $client->setApplicationName('Google API PHP');
        $client->setScopes($scopes);
        $client->setAccessType('offline');
        $client->setAuthConfig(dirname(__FILE__) . '/client_secret.json');
        return $client->createAuthUrl();
    }
}