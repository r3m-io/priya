{{R3M}}
{{$options = options()}}

{{if(!is.empty($options.stream))}}
    {{$stream = []}}
    {{$stream['test'] = terminal.readline('stream')}}
    {{dd($stream)}}
{{else}}
    is no stream
{{/if}}
