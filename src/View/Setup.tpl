{{R3M}}
{{$key = request(0)}}
{{$url = config('framework.dir.data') + config('dictionary.package') + config('extension.json')}}
{{$package = object.select($url, 'package.' + $key, true, 'item')}}
Setup {{$key}}:
{{$info = 'This will setup ' + $key + '. Are you sure you want to continue (y/n): '}}
{{$setup = []}}
{{$setup[][$key]['info2'+ '345'] = terminal.readline($info)}}
{{$setup[][$key][] = terminal.readline($info)}}
{{$setup[][$key][] = terminal.readline($info)}}
{{dd('{{$this}}')}}