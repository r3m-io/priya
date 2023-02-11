<?php

namespace Priya;

use R3m\Io\Module\Data;
use R3m\Io\Module\Dir;
use stdClass;

Trait Installation {

    public function prepare(stdClass $package=null){
        if(property_exists($package, 'installation')){
            $url = $package->installation;
            $dir = Dir::name($url);
            Dir::create($dir, Dir::CHMOD);
        }
        $object = $this->object();
        $data = $object->data_read($url);
        if(!$data){
            $data = new Data();
        }
        $root = Dir::name(__DIR__, 2);
        d($root);
        ddd($package);
    }
}