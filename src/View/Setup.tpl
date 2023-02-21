{{R3M}}
Welcome to the r3m-io/priya setup.
There are three ways to configure priya.

You can create a subdomain to host the javascript files.[1]
You can configure it in the main Public directory to have it accessible on each domain.[2]
You can configure it in one/or more of the host's Public directories.[3]

[1] Please create a subdomain before continuing this script.
    https://docs.r3m.io/Start/Configuration/#r3m-io-configure-domain
[2] You need to move the files manually to the Public directory.
[3] This setup.

This setup can only install priya in one of the host's Public directories.
You can decide which environment you will use:
- development
- production

The development version will have separate files for each prototype.
The production version will have an "All.prototype.js" with each prototype inside.
The bootstrap.json will be changed accordingly.

You can add your own files to the bootstrap.json file.
There is no way (without error) to have a separate file for custom scripts, but modules are promising.
With Javascript modules you can use Priya to save state, and you do not need to modify the bootstrap.json.
Priya has namespaces available for huge amount of different states, it is endless.
Request content and parse it as such with r3m-io/framework.
Require Javascript and CSS as a master!

When using a subdomain for the scripts (scripts.example.com for example) you also need to configure cors.
https://docs.r3m.io/Security/Cors/

{{$hostnames = Priya:Setup:hostnames()}}
{{for.each($hostnames as $hostname)}}
- {{$hostname}}

{{/for.each}}
{{while(true)}}
{{$hostname = terminal.readline('Which hostname: ')}}
{{$hostname = Priya:Setup:bestmatch($hostname, $hostnames)}}
{{if(!is.empty($hostname))}}
{{break()}}
{{/if}}
{{/while}}
{{$environments = Priya:Setup:environments()}}
{{for.each($environments as $environment)}}
- {{$environment}}

{{/for.each}}
{{while(true)}}
{{$environment = terminal.readline('Which environment: ')}}
{{$environment = Priya:Setup:bestmatch($environment, $environments)}}
{{if(!is.empty($environment))}}
{{break()}}
{{/if}}
{{/while}}
{{if(Priya:Setup:has_subdomain($hostname))}}
{{Priya:Setup:install([
'hostname' => $hostname,
'environment' => $environment,
'target' =>
config('project.dir.host') +
Priya:Setup:extract_dir_subdomain($hostname) +
'/' +
Priya:Setup:extract_dir_domain($hostname) +
'/' +
Priya:Setup:extract_dir_extension($hostname) +
'/Public/Js/Priya/' +
object.select(config('controller.dir.public') + 'Priya/Bin/Bootstrap.json', 'collect.version') +
'/'
])}}
{{else}}
{{Priya:Setup:install([
'hostname' => $hostname,
'environment' => $environment,
'target' =>
config('project.dir.host') +
Priya:Setup:extract_dir_domain($hostname) +
'/' +
Priya:Setup:extract_dir_extension($hostname) +
'/Public/Js/Priya/' +
object.select(config('controller.dir.public') + 'Priya/Bin/Bootstrap.json', 'collect.version') +
'/'
])}}
{{/if}}
{{if(is.empty(config('server.cors')))}}
Now it is time to enable CORS for domains who have to reach {{$hostname}}.

We think the defaults are sufficient for now, you can adjust it, if you want.
{{Priya:Setup:cors()}}
{{else}}
Cors seems to be configured already.
{{Priya:Setup:cors()}}
{{/if}}






