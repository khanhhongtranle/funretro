<?php
require_once dirname(__FILE__) . '/vendor/autoload.php';

class PHPDrive
{
    private $service;

    /**
     * PHPGmail constructor.
     * @param Google_Client $client
     */
    public function __construct(Google_Client $client)
    {
        $this->service = new Google_Service_Drive($client);
    }

    function getFiles($q = array())
    {
        $result = array();
        $pageToken = NULL;

        do {
            try {
                $parameters = array(
                    'q' => implode(' ', $q)
                );
                if ($pageToken) {
                    $parameters['pageToken'] = $pageToken;
                }
                $files = $this->service->files->listFiles($parameters);

                $result = array_merge($result, $files->getFiles());
                echo $files->getwebContentLink . '<br/>';
                $pageToken = $files->getNextPageToken();
            } catch (Exception $e) {
                $pageToken = NULL;
            }
        } while ($pageToken);
        return $result;
    }

    function uploadFile($title, $parentId, $filepath, $file_mine_type = 0)
    {
        $fileMetadata = new Google_Service_Drive_DriveFile(array(
            'name' => $title,
            'parents' => array($parentId)));
        $content = file_get_contents($filepath);
        $file = $this->service->files->create($fileMetadata, array(
            'data' => $content,
            'mimeType' => $file_mine_type ? $file_mine_type : mime_content_type($filepath),
            'uploadType' => 'multipart',
            'fields' => 'id,webViewLink'));
        return $file;
    }

    function getShareLink($fileId)
    {
        $f = $this->service->files->get($fileId, array("fields" => "webViewLink"));
        return $f->webViewLink;
    }

    function getFilesInFolder($q = array(), $orderBy = '')
    {
        $result = array();
        $data = array();
        $pageToken = NULL;

        do {
            try {
                $parameters = array(
                    'q' => implode(' ', $q),
                    'orderBy' => $orderBy
                );
                if ($pageToken) {
                    $parameters['pageToken'] = $pageToken;
                }
                $files = $this->service->files->listFiles($parameters);

                $result = array_merge($result, $files->getFiles());
                $pageToken = $files->getNextPageToken();
            } catch (Exception $e) {
                $pageToken = NULL;
            }
        } while ($pageToken);

        $count = sizeof($result);
        for ($i = 0; $i < $count; $i++) {
            $data[$i]['id'] = $result[$i]->id;
            $data[$i]['name'] = $result[$i]->name;
            $data[$i]['mimeType'] = $result[$i]->mimeType;
            if ($result[$i]->mimeType == 'application/vnd.google-apps.folder') {
                $data[$i]['child'] = $this->getFilesInFolder(array("'" . $result[$i]->id . "' in parents"), 'name_natural asc');
            }
        }

        return $data;
    }


//    function getFile(array $fileId){
//        $f = array();
//
//
//        $f= $this->service->files->get($fileId);
//        return array(
//          'title'=>$f->title,
//        );
//        return $f;
//    }


    public function deleteFile($fileId)
    {
        $this->service->files->delete($fileId);
    }
}