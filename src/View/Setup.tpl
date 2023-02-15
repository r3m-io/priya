{{R3M}}
{{$options = options()}}
{{if(!is.empty($options.stream))}}
    {{$stream = []}}
    {{$stream[] = terminal.readline('stream')}}
    {{$key = array.key.last($stream)}}
    {{dd(array.key.last($stream))}}
{{else}}
    is no stream
{{/if}}
