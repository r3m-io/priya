{{R3M}}
{{$options = options()}}
{{if(!is.empty($options.stream))}}
    {{$stream = []}}
    {{$stream[] = terminal.readline('stream')}}
    {{$key = array.key.last($stream)}}
    {{$request = 'request'}}
    {{dd($stream[array.key.last($stream)][$request][1])}}
{{else}}
    is no stream
{{/if}}
