{{$key = request(0)}}
{{$url = config('framework.dir.data') + config('dictionary.package') + config('extension.json')}}
{{$package = object.select($url, 'package.' + $key, true, 'item')}}
Installation.

{{priya:installation:prepare($package)}}

{{dd($package)}}