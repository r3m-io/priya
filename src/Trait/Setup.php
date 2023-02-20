<?php

namespace Priya;

use R3m\Io\Module\Data;
use R3m\Io\Module\Dir;
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
        $match = [];
        foreach($options as $nr => $option){
            $match = substr($option, 0, $min);
            $score = levenshtein($search, $match);
            $match[$score][] = $option;
        }
        ddd($match);
    }


}