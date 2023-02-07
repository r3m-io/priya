_('prototype').exception = function (data, except){
    console.log(data);
    if(
        !is.empty(data.class) &&
        (
            data.class.toLowerCase() === 'exception' ||
            data.class.toLowerCase() === 'errorexception' ||
            in_array(data.class, [
                'R3m\\Io\\Exception\\LocateException',
                'R3m\\Io\\Exception\\ObjectException',
                'R3m\\Io\\Exception\\PluginNotFoundException',
                'R3m\\Io\\Exception\\UrlEmptyException',
                'R3m\\Io\\Exception\\UrlNotExistException',
            ])
        )
    ){
        console.log('exception triggered');
        this.debug(JSON.stringify(data, null, 2));
    }
    if(
        !is.empty(data.class) &&
        _('_').stristr(data.class, 'locateException') !== false
    ){
        console.log('exception triggered');
        this.debug(JSON.stringify(data, null, 2));
        if(data?.code === 1){
            console.log('debug location information added...');
        }
    }
}

priya.exception = _('prototype').exception;