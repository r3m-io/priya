<?php

namespace Priya;

use Exception;
use R3m\Io\Config;
use R3m\Io\Module\Core;
use R3m\Io\Module\Data;
use R3m\Io\Module\Dir;
use R3m\Io\Module\File;
use R3m\Io\Module\Sort;
use stdClass;

Trait Setup {


    public function hostnames(): array
    {
        $object = $this->object();
        $url = $object->config('project.dir.data') . 'Hosts' . $object->config('extension.json');
        $read = $object->data_read($url);
        $result = [];
        if($read){
            foreach($read->data('host') as $key => $host){
                $hostname = false;
                if(
                    property_exists($host, 'subdomain') &&
                    property_exists($host, 'domain') &&
                    property_exists($host, 'extension')
                ){
                    $hostname = $host->subdomain . '.' . $host->domain . '.' . $host->extension;
                } elseif(
                    property_exists($host, 'domain') &&
                    property_exists($host, 'extension')
                ) {
                    $hostname = $host->domain . '.' . $host->extension;
                }
                if($hostname){
                    $result[] = $hostname;
                }
            }
        }
        return $result;
    }

    public function environments(): array
    {
        return [
            'development',
            'production'
        ];
    }

    public function bestmatch($search='', $options=[]){
        $min = false;
        if(strlen($search) > 255){
            $search = strlen($search, 0, 255);
        }
        foreach($options as $nr => $option){
            $length = strlen($option);
            if(!$min){
                $min = $length;
                continue;
            }
            if($length < $min){
                $min = $length;
            }
            if($min > 255){
                $min = 255;
            }
        }
        $bestmatch = [];
        foreach($options as $nr => $option){
            $match = substr($option, 0, $min);
            $score = levenshtein($search, $match);
            if($score === $min){
                continue;   //no match
            }
            $bestmatch[$score][] = $option;
        }
        if(!empty($bestmatch)){
            ksort($bestmatch, SORT_NATURAL);
            $result = reset($bestmatch);
            if(array_key_exists(0, $result)){
                return $result[0];
            }
        }
    }

    /**
     * @throws Exception
     */
    public function install($options=[]){
        if(empty($options['target'])){
            return;
        }
        if(Dir::is($options['target'])){
            Dir::remove($options['target']);
//            throw new Exception('Target exists: ' . $options['target']);
        }
        $object = $this->object();
        $dir = new Dir();
        $url = $object->config('controller.dir.public') . 'Priya' . $object->config('ds');
        $read = $dir->read($url, true);

        if($read){
            if($options['environment'] === Config::MODE_DEVELOPMENT){
                Dir::create($options['target']);
                foreach($read as $file){
                    if($file->type === File::TYPE){
                        $target = explode($url, $file->url, 2);
                        if(array_key_exists(1, $target)){
                            $target = $options['target'] . $target[1];
                            $dir = Dir::name($target);
                            Dir::create($dir);
                            File::copy($file->url, $target);
                        }
                    }
                }
                $id = posix_getuid();
                if(empty($id)){
                    $command = 'chown www-data:www-data ' . $object->config('project.dir.host') . ' -R';
                    Core::execute($object, $command);
                }
                $dir = Dir::name($options['target']);
                Dir::change($dir);
                $link = 'Latest';
                if(File::exist($dir . $link)){
                    File::delete($dir . $link);
                }
                $explode = explode($dir, $options['target'], 2);
                ddd($explode);
                File::link($options['target'], $link);
                echo 'Installation complete: ' . $options['target'] . PHP_EOL;
            } else {
                //MODE_PRODUCTION
                ddd('mode production');
            }
        }
    }

    public function has_subdomain($hostname=''){
        $explode = explode('.', $hostname, 3);
        if(array_key_exists(2, $explode)){
            return true;
        }
        return false;
    }

    public function extract_dir_subdomain($hostname=''){
        $explode = explode('.', $hostname, 3);
        $count = count($explode);
        if(
            $count === 3 &&
            array_key_exists(0, $explode)
        ){
            $subdomain = ucfirst($explode[0]);
            return $subdomain;
        }
    }

    public function extract_dir_domain($hostname=''){
        $explode = explode('.', $hostname, 3);
        $count = count($explode);
        if(
            $count === 3 &&
            array_key_exists(1, $explode)
        ){
            $domain = ucfirst($explode[1]);
            return $domain;
        }
        elseif(
            $count === 2  &&
            array_key_exists(0, $explode)
        ){
            $domain = ucfirst($explode[0]);
            return $domain;
        }
    }

    public function extract_dir_extension($hostname=''){
        $explode = explode('.', $hostname, 3);
        $count = count($explode);
        if(
            $count === 3 &&
            array_key_exists(2, $explode)
        ){
            $extension = ucfirst($explode[2]);
            return $extension;
        }
        elseif(
            $count === 2 &&
            array_key_exists(1, $explode)
        ) {
            $extension = ucfirst($explode[1]);
            return $extension;
        }
    }

}