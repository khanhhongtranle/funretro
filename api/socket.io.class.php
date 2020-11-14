<?php

class SocketIO
{
    private $host, $port;

    function __construct($host, $port)
    {
        $this->host = $host;
        $this->port = $port;
    }

    public function send($data)
    {
        $params = array(
            'is_php_client' => 1,
            'message' => $this->json_encode_utf8($data)
        );
        if ($this->sendMessageToServer($this->host, $this->port, http_build_query($params)))
            return true;
        return false;
    }

    private function json_encode_utf8($objectToEncode)
    {
        $objectToEncode = json_encode($objectToEncode);
        $objectToEncode = preg_replace_callback('/(?<!\\\\)\\\\u(\w{4})/', function ($matches) {
            return html_entity_decode('&#x' . $matches[1] . ';', ENT_COMPAT, 'UTF-8');
        }, $objectToEncode);
        return $objectToEncode;
    }

    private function sendMessageToServer($host = null, $port = null, $data = null, $address = "/socket.io/?EIO=2", $transport = 'websocket')
    {
        $fd = fsockopen($host, $port, $errno, $errstr);
        if (!$fd) return false;
        $action = '';
        $key = $this->generateKey();
        $out = "GET $address&transport=$transport&$data HTTP/1.1\r\n";
        $out .= "Host: http://$host:$port\r\n";
        $out .= "Upgrade: WebSocket\r\n";
        $out .= "Connection: Upgrade\r\n";
        $out .= "Sec-WebSocket-Key: $key\r\n";
        $out .= "Sec-WebSocket-Version: 13\r\n";
        $out .= "Origin: *\r\n\r\n";
        fwrite($fd, $out);
        $result = fread($fd, 10000);
        preg_match('#Sec-WebSocket-Accept:\s(.*)$#mU', $result, $matches);
        $keyAccept = trim($matches[1]);
        $expectedResonse = base64_encode(pack('H*', sha1($key . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
        $handshaked = ($keyAccept === $expectedResonse) ? true : false;
        if ($handshaked) {
            fwrite($fd, $this->hybi10Encode('42["' . $action . '", "' . addslashes($data) . '"]'));
            fread($fd, 1000000);
            return true;
        }
        return false;
    }

    private function generateKey($length = 16)
    {
        $c = 0;
        $tmp = '';
        while ($c++ * 16 < $length) {
            $tmp .= md5(mt_rand(), true);
        }
        return base64_encode(substr($tmp, 0, $length));
    }

    private function hybi10Encode($payload, $type = 'text', $masked = true)
    {
        $frameHead = array();
        $payloadLength = strlen($payload);
        switch ($type) {
            case 'text':
                $frameHead[0] = 129;
                break;
            case 'close':
                $frameHead[0] = 136;
                break;
            case 'ping':
                $frameHead[0] = 137;
                break;
            case 'pong':
                $frameHead[0] = 138;
                break;
        }
        if ($payloadLength > 65535) {
            $payloadLengthBin = str_split(sprintf('%064b', $payloadLength), 8);
            $frameHead[1] = ($masked === true) ? 255 : 127;
            for ($i = 0; $i < 8; $i++) {
                $frameHead[$i + 2] = bindec($payloadLengthBin[$i]);
            }
            if ($frameHead[2] > 127) {
                $this->close(1004);
                return false;
            }
        } elseif ($payloadLength > 125) {
            $payloadLengthBin = str_split(sprintf('%016b', $payloadLength), 8);
            $frameHead[1] = ($masked === true) ? 254 : 126;
            $frameHead[2] = bindec($payloadLengthBin[0]);
            $frameHead[3] = bindec($payloadLengthBin[1]);
        } else {
            $frameHead[1] = ($masked === true) ? $payloadLength + 128 : $payloadLength;
        }
        foreach (array_keys($frameHead) as $i) {
            $frameHead[$i] = chr($frameHead[$i]);
        }
        if ($masked === true) {
            $mask = array();
            for ($i = 0; $i < 4; $i++) {
                $mask[$i] = chr(rand(0, 255));
            }
            $frameHead = array_merge($frameHead, $mask);
        }
        $frame = implode('', $frameHead);
        for ($i = 0; $i < $payloadLength; $i++) {
            $frame .= ($masked === true) ? $payload[$i] ^ $mask[$i % 4] : $payload[$i];
        }
        return $frame;
    }
}