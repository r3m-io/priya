<?php

namespace R3m\Io\Priya\Controller;

use Exception;
use R3m\Io\App;

use R3m\Io\Module\Controller;
use R3m\Io\Module\Dir;
use R3m\Io\Module\File;

use R3m\Io\Exception\LocateException;
use R3m\Io\Exception\UrlEmptyException;
use R3m\Io\Exception\UrlNotExistException;

class Cli extends Controller {
    const DIR = __DIR__ . '/';
    const MODULE_INFO = 'Info';

    static public function run(App $object){
        $priya = $object->request(0);
        ddd($priya);

        $scan = Cli::scan($object);
        $module = $object->parameter($object, 'configure', 1);
        if(!in_array($module, $scan['module'])){
            $module = Cli::MODULE_INFO;
        }
        $submodule = $object->parameter($object, 'configure', 2);
        if(
            !in_array(
                $submodule,
                $scan['submodule']
            )
        ){
            if($module === Cli::MODULE_INFO){
                $submodule = false;
            } else {
                $submodule = Cli::MODULE_INFO;
            }
        }
        $command = $object->parameter($object, 'configure', 3);
        if(
            !in_array(
                $command,
                $scan['command']
            ) ||
            $module === Cli::MODULE_INFO ||
            $submodule === Cli::MODULE_INFO
        ){
            $command = false;
        }
        $subcommand = $object->parameter($object, 'configure', 3);
        if(
            !in_array(
                $subcommand,
                $scan['subcommand']
            ) ||
            $module === Cli::MODULE_INFO ||
            $submodule === Cli::MODULE_INFO
        ){
            $subcommand = false;
        }
        try {
            if(
                !empty($submodule) &&
                !empty($command) &&
                !empty($subcommand)
            ){
                $url = Cli::locate(
                    $object,
                    ucfirst($module) .
                    '.' .
                    ucfirst($submodule) .
                    '.' .
                    ucfirst($command) .
                    '.' .
                    ucfirst($subcommand)
                );
            }
            elseif(
                !empty($submodule) &&
                !empty($command)
            ){
                $url = Cli::locate(
                    $object,
                    ucfirst($module) .
                    '.' .
                    ucfirst($submodule) .
                    '.' .
                    ucfirst($command)
                );
            }
            elseif(!empty($submodule)){
                $url = Cli::locate(
                    $object,
                    ucfirst($module) .
                    '.' .
                    ucfirst($submodule)
                );
            } else {
                $url = Cli::locate(
                    $object,
                    ucfirst($module)
                );
            }
            return Cli::response($object, $url);
        } catch (Exception | UrlEmptyException | UrlNotExistException | LocateException $exception){
            return $exception;
        }
    }

    private static function scan(App $object): array
    {
        $scan = [
            'module' => [],
            'submodule' => [],
            'command' => [],
            'subcommand' => []
        ];
        $url = $object->config('controller.dir.view');
        if(!Dir::exist($url)){
            return $scan;
        }
        $dir = new Dir();
        $read = $dir->read($url, true);
        if(!$read){
            return $scan;
        }

        foreach($read as $nr => $file){
            if($file->type !== File::TYPE){
                continue;
            }
            $part = substr($file->url, strlen($url));
            $explode = explode('/', $part, 2);
            $submodule = false;
            $command = false;
            $subcommand = false;

            if(array_key_exists(1, $explode)){
                $module = strtolower($explode[0]);
                $temp = explode('.', $explode[1]);
                array_pop($temp);
                $submodule = strtolower($temp[0]);
                if(array_key_exists(1, $temp)){
                    $command = strtolower($temp[1]);
                }
                if(array_key_exists(2, $temp)){
                    $subcommand = strtolower($temp[1]);
                }
            } else {
                $temp = explode('.', $explode[0]);
                array_pop($temp);
                $module = strtolower($temp[0]);
                if(array_key_exists(1, $temp)){
                    $submodule = strtolower($temp[1]);
                }
                if(array_key_exists(2, $temp)){
                    $command = strtolower($temp[1]);
                }
                if(array_key_exists(3, $temp)){
                    $subcommand = strtolower($temp[1]);
                }
            }
            if(
                !in_array(
                    $module,
                    $scan['module']
                )
            ){
                $scan['module'][] = $module;
            }
            if(
                $submodule &&
                !in_array(
                    $submodule,
                    $scan['submodule']
                )
            ){
                $scan['submodule'][] = $submodule;
            }
            if(
                $command  &&
                !in_array(
                    $command,
                    $scan['command']
                )
            ){
                $scan['command'][] = $command;
            }
            if(
                $subcommand &&
                !in_array(
                    $subcommand,
                    $scan['subcommand']
                )
            ){
                $scan['subcommand'][] = $subcommand;
            }
        }
        return $scan;
    }
}