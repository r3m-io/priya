{{R3M}}
{{$installations = Priya:Setup:installations()}}
{{$hostnames = []}}
{{for.each($installations as $installation)}}
- {{$hostnames[] = $installation.hostname}}{{$installation.hostname}} ({{$installation.version}})

{{/for.each}}
{{while(true)}}
{{$hostname = terminal.readline('Which hostname: ')}}
{{$hostname = Priya:Setup:bestmatch($hostname, $hostnames)}}
{{if(!is.empty($hostname))}}
{{break()}}
{{/if}}
{{/while}}
{{$url = config('framework.dir.data') + config('dictionary.package') + config('extension.json')}}
{{$select = 'package.' + request(0)}}
{{$package = parse.select($url, $select)}}
{{Priya:Setup:restore($package, $hostname)}}