{{R3M}}
{{$from = terminal.readline('stream')}}
{{dd($from)}}


{{$key = request(0)}}
{{$url = config('framework.dir.data') + config('dictionary.package') + config('extension.json')}}
{{$package = object.select($url, 'package.' + $key, true, 'scope:object')}}
Setup {{$key}}:
{{$info = 'This will setup ' + $key + '. Are you sure you want to continue (y/n): '}}
{{$setup = []}}
{{$setup[][$key]['info2'+ '34.5'] = terminal.readline($info)}}
{{$setup[4][$key|default:"term"][] = terminal.readline($info)}}
{{$setup[][$key][] = terminal.readline($info)}}
{{dd('{{$this}}')}}