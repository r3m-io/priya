{{R3M}}
{{$options = options()}}

{{if(!is.empty($options.stream))}}
    {{$stream = []}}
    {{$stream['test.2'][] = terminal.readline('stream')}}
    {{dd($stream)}}
{{else}}
    is no stream
{{/if}}
