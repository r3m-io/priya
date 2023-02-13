{{R3M}}
{{if(config('is.stream') === true)}}
{{$stream = terminal.readline('stream')}}
{{if(!is.empty($stream.server.config))}}
{{$config = config($stream.server.config)}}
{{/if}}
{{if(!is.empty($stream.server.route))}}
{{$route = route.data($stream.server.route)}}
{{/if}}
is stream
{{/if}}
