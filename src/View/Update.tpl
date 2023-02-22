{{R3M}}
This will update package {{request(0)}}
{{$url = config('framework.dir.data') + config('dictionary.package') + config('extension.json')}}
{{$select = 'package.' + request(0)}}
{{$package = parse.select($url, $select)}}

{{dd('{{$this}}')}}