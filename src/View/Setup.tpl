{{R3M}}
{{$stream = terminal.readline('stream')}}
{{if(!is.empty($stream.server.config))}}
{{$config = config($stream.server.config)}}
{{/if}}
{{if(!is.empty($stream.server.route))}}
{{dd('yes')}}
{{$route = route.data($stream.server.route)}}
{{/if}}
{{dd('no')}}