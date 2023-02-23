<?php

namespace Priya;

use Exception;
use R3m\Io\App;
use R3m\Io\Config;
use R3m\Io\Exception\ObjectException;
use R3m\Io\Module\Core;
use R3m\Io\Module\Data;
use R3m\Io\Module\Dir;
use R3m\Io\Module\File;
use R3m\Io\Module\Parse;
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
                    $host->subdomain !== false &&
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
     * @throws ObjectException
     * @throws Exception
     */
    public function cors($options=[]){
        $hostnames = $this->hostnames();
        $list = [];
        foreach($hostnames as $hostname){
            $explode = explode('.', $hostname, 3);
            if(array_key_exists(2, $explode)){
                //don't need subdomains
                $list[] = $explode[1] . '.' . $explode[2];
            }
            elseif(array_key_exists(1, $explode)){
                $list[] = $explode[0] . '.' . $explode[1];
            }
        }
        $list = array_unique($list);
        $hostnames = [];
        $setup_default = false;
        foreach($list as $hostname){
            if($setup_default === false){
                $setup_default = $hostname;
            } else {
                $hostnames[] = $hostname;
            }
            $hostnames[] = '*.' . $hostname;
        }
        $object = $this->object();
        $command = Core::binary() . ' configure cors setup default ' . escapeshellcmd($setup_default);
        Core::execute($object, $command, $output, $error);
        foreach($hostnames as $hostname){
            $command = Core::binary() . ' configure cors domain enable ' . escapeshellcmd($hostname);
            Core::execute($object, $command, $output, $error);
        }
        $instance = App::instance();
        $cors = $instance->config('server.cors');
        echo 'Cors configuration: ' . PHP_EOL;
        echo Core::object($cors, Core::OBJECT_JSON) . PHP_EOL;
    }

    /**
     * @throws Exception
     */
    public function install($options=[]){
        $id = posix_getuid();
        if(
            !in_array(
                $id,
                [
                    0,
                    33
                ]
            )
        ){
            throw new Exception('Only root & www-data can setup install...');
        }
        if(empty($options['target'])){
            return;
        }
        if(empty($options['package'])){
            return;
        }
        $object = $this->object();
        $url = $object->config('framework.dir.data') . $object->config('dictionary.package') . $object->config('extension.json');
        $package = $object->parse_select(
            $url,
            'package.' . $options['package']
        );

        $is_found = false;
        $installation = null;
        if($package && $package->has('installation')){
            $install = $object->data_read($package->get('installation'));
            if($install){
                foreach($install->get('installation') as $installation){
                    if(
                        property_exists($installation, 'hostname') &&
                        property_exists($installation, 'package') &&
                        property_exists($installation->package, 'name') &&
                        $options['hostname'] === $installation->hostname &&
                        $options['package'] === $installation->package->name
                    ){
                        $installation = new Data($installation);
                        $is_found = true;
                        break;
                    }
                }
            }
        }
        if(
            $is_found &&
            $installation
        ){
            if($options['environment'] !== $installation->get('environment')){
                $installation->set('date', date('Y-m-d H:i:s+00:00'));
                $installation->set('directory', $options['target']);
                $installation->set('environment', $options['environment']);
            } else {
                echo 'Already installed...' . PHP_EOL;
                return;
            }
        } else {
            $installation = new Data();
            if(
                array_key_exists('hostname', $options) &&
                array_key_exists('environment', $options)
            ){
                $installation->set('date', date('Y-m-d H:i:s+00:00'));
                $installation->set('directory', $options['target']);
                $installation->set('hostname', $options['hostname']);
                $installation->set('environment', $options['environment']);
            }
        }
        if(Dir::is($options['target'])){
            Dir::remove($options['target']);
        }
        if($options['environment'] === Config::MODE_DEVELOPMENT) {
            $dir = new Dir();
            $url = $object->config('controller.dir.public') . 'Priya' . $object->config('ds');
            $read = $dir->read($url, true);
            if ($read) {
                Dir::create($options['target']);
                foreach ($read as $file) {
                    if ($file->type === File::TYPE) {
                        $target = explode($url, $file->url, 2);
                        if (array_key_exists(1, $target)) {
                            $target = $options['target'] . $target[1];
                            $dir = Dir::name($target);
                            Dir::create($dir);
                            File::copy($file->url, $target);
                        }
                    }
                }
            }
        } else {
            //MODE_PRODUCTION
            $url =
                $object->config('controller.dir.public') .
                'Priya' .
                $object->config('ds') .
                'Bin' .
                $object->config('ds') .
                'Bootstrap.json'
            ;
            $data = $object->data_read($url);
            if($data){
                $list = $data->data('require.file');
                sort($list, SORT_NATURAL);
                $core = [];
                foreach($list as $nr => $file){
                    $comment = [];
                    $comment[] = '/**';
                    $comment[] = ' * ' . $file;
                    $comment[] = ' */';
                    $core[] = implode(PHP_EOL, $comment);
                    $file = $object->config('controller.dir.public') . 'Priya/Bin/' . $file;
                    $read = File::read($file);
                    $core[] = $read;
                    $core[] = '';
                }
                $core = implode(PHP_EOL, $core);
                $file = 'Core-' . $data->data('collect.version') . '.js';
                $dir = $options['target'] . 'Bin/';
                Dir::create($dir);
                $url = $dir . $file;
                File::put($url, $core);
                $list = [];
                $list[] = $file;
                $data->data('require.file', $list);
                $url = $dir . 'Bootstrap.json';
                File::put($url, Core::object($data->data(), Core::OBJECT_JSON));
                $dir = $options['target'];
                $source_list = [
                    'Bin/Priya.prototype.js',
                    'Priya.js',
                    'README.md',
                    'LICENSE',
                    'example.html'
                ];
                foreach($source_list as $source){
                    $source_url = $object->config('controller.dir.public') . 'Priya' . '/' . $source;
                    $target_url = $dir . $source;
                    File::copy($source_url, $target_url);
                }
            }
        }
        $dir = Dir::name($options['target']);
        Dir::change($dir);
        $link = 'Latest';
        if (File::exist($dir . $link)) {
            File::delete($dir . $link);
        }
        $explode = explode($dir, $options['target'], 2);
        $version = array_pop($explode);
        if (substr($version, -1, 1) === $object->config('ds')) {
            $version = substr($version, 0, -1);
        }
        $installation->set('version', $version);
        File::link($version, $link);
        if(
            $package
        ){
            $installation->set('package.name', $package->get('name'));
            $url = $package->get('installation');
            $dir = Dir::name($url);
            Dir::create($dir);

            $install = $object->data_read($url);
            if(!$install){
                $install = new Data();
            }
            $list = $install->get('installation');
            if(empty($list)){
                $list = [];
            }
            if(!is_array($list)){
                $list = [];
            }
            if(!empty($options['update'])){
                $node = false;
                $nr = null;
                foreach($list as $nr => $record){
                    if(
                        property_exists($record, 'hostname') &&
                        $record->hostname === $options['hostname']
                    ){
                        $node = $record;
                        break;
                    }
                }
                if(
                    $node &&
                    $nr !== null
                ){
                    if(property_exists($node, 'version')){
                        $restore_version = $node->version;
                        if(!property_exists($node, 'restore')){
                            $node->restore = [];
                        }
                        $node->restore[] = $restore_version;
                    }
                    $node->version =  $installation->get('version');;
                    $node->date = $installation->get('date');
                    $node->directory = $installation->get('directory');
                    $list[$nr] = $node;
                }
            } else {
                $list[] = $installation->data();
            }
            $install->set('installation', $list);
            $install->write($url);
        }
        if (empty($id)) {
            $command = 'chown www-data:www-data ' . $object->config('project.dir.host') . ' -R';
            Core::execute($object, $command);
            $command = 'chown www-data:www-data ' . $object->config('project.dir.data') . ' -R';
            Core::execute($object, $command);
        }
        if(!empty($options['update'])){
            echo 'Update complete: ' . $options['target'] . PHP_EOL;
        } else {
            echo 'Installation complete: ' . $options['target'] . PHP_EOL;
        }

    }

    /**
     * @throws ObjectException
     * @throws Exception
     */
    public function update($package){
        $object = $this->object();
        $package = new Data($package);
        if($package->has('composer')){
            Dir::change($object->config('project.dir.root'));
            Core::execute($object, $package->get('composer'), $output, $error);
            if($output){
                echo $output;
            }
            if($error){
                echo $error;
            }
        }
        $is_update = false;
        if($package->has('installation')){
            $data = $object->data_read($package->get('installation'));
            if($data){
                $url = $object->config('controller.dir.public') . 'Priya/Bin/Bootstrap' . $object->config('extension.json');
                $boot = $object->data_read($url);
                if($boot){
                    foreach($data->get('installation') as $installation){
                        if(property_exists($installation, 'version')){
                            if(version_compare($boot->get('collect.version'), $installation->version, '!=')){
                                $this->install([
                                    'hostname' => $installation->hostname,
                                    'environment' => $installation->environment,
                                    'target' => dir::name($installation->directory) . $boot->get('collect.version') . $object->config('ds'),
                                    'update' => true
                                ]);
                                $is_update = true;
                            }
                        }
                    }
                }
            }
        }
        if(!$is_update){
            echo 'No updates found...' . PHP_EOL;
        }
    }

    public function has_subdomain($hostname=''): bool
    {
        $explode = explode('.', $hostname, 3);
        if(array_key_exists(2, $explode)){
            return true;
        }
        return false;
    }

    public function extract_dir_subdomain($hostname=''): string
    {
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

    public function extract_dir_domain($hostname=''): string
    {
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

    public function extract_dir_extension($hostname=''): string
    {
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