{{R3M}}
{{$url = config('framework.dir.data') + config('dictionary.package') + config('extension.json')}}
{{$select = 'package.' + request(0)}}
{{$package = parse.select($url, $select)}}
{{Priya:Setup:restore($package)}}