<?php

namespace Priya;

use R3m\Io\Module\Data;
use R3m\Io\Module\Dir;
use stdClass;

Trait Installation {

    public function register(stdClass $package=null){
        if(property_exists($package, 'installation')){
            $url = $package->installation;
            $dir = Dir::name($url);
            Dir::create($dir, Dir::CHMOD);
            $object = $this->object();
            $data = $object->data_read($url);
            if(!$data){
                $data = new Data();
            }
            $dir_priya = Dir::name(__DIR__, 2);
            $data->set('installation.date', date('Y-m-d H:i:s+00:00'));
            $data->set('installation.directory', $dir_priya);
            $data->set('installation.package', $package->name);
            $dir = new Dir();
            $read = $dir->read($dir_priya, true);
            $fileList = [];
            $dirList = [];
            foreach($read as $file){
                if($file->type === Dir::TYPE){
                    $dirList[] = $file;
                } else {
                    $fileList[] = $file;
                }
            }
            $data->set('installation.dir', $dirList);
            $data->set('installation.file', $fileList);
            $data->write($url);
        }
    }
}