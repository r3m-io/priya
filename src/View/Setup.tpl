{{R3M}}
{{$key = request(0)}}
{{$url = config('framework.dir.data') + config('dictionary.package') + config('extension.json')}}
{{$package = object.select($url, 'package.' + $key, true, 'item')}}
Setup {{$key}}.
{{Priya:Setup:register($package)}}