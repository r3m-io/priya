{{R3M}}
{{$options = options()}}

{{if(!is.empty($options.stream))}}
    {{$stream = []}}
    {{$stream[] = terminal.readline('stream')}}
    {{dd($stream)}}
{{else}}
    is no stream
{{/if}}
