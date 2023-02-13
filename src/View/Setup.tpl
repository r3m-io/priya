{{R3M}}
{{$options = options()}}
{{if(in.array('stream', $options))}}
{{$stream = terminal.readline('stream')}}
{{if(!is.empty($stream.server.config))}}
{{$config = config($stream.server.config)}}
{{/if}}
{{if(!is.empty($stream.server.route))}}
{{$route = route.data($stream.server.route)}}
{{/if}}
is stream
{{else}}
is no stream
{{/if}}
{{/if}}

