{{R3M}}
{{$options = options()}}
{{if(!is.empty($options.stream))}}
    {{$stream = []}}
    {{$stream[] = terminal.readline('stream')}}
    {{$key = array.key.last($stream)}}
    {{if(
    $stream[$key]['request'][0] === 'install' &&
    $stream[$key]['request'][1] === 'r3m-io/priya'
    )}}
        this stream is allowed
    {{else}}
        {{d($stream[$key]['request'][0])}}
        {{d($stream[$key]['request'][1])}}
        {{dd($stream[$key]['request'])}}
        not allowed
    {{/if}}
{{else}}
    is no stream
{{/if}}
