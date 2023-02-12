{{R3M}}
{{$key = request(0)}}
{{$url = config('framework.dir.data') + config('dictionary.package') + config('extension.json')}}
{{$package = object.select($url, 'package.' + $key, true, 'item')}}
Setup {{$key}}:

{{$setup.continue = terminal.readline('This will setup ' + $key + '. Are you sure you want to continue (y/n)')}}
{{dd('{{$this}}')}}