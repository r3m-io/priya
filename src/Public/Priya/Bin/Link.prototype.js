_('prototype').link = function (data, closure){
    if(typeof data == 'undefined'){
        return;
    }
    if(typeof data == 'string'){
        var data = {
            link : [data]
        };
    }
    if(this.is_set(data.href)){
        priya.select('head').appendChild(data);
        priya.load++;
        data.addEventListener('load', function(event){
            priya.load--;
        }, false);
        if(closure){
            data.addEventListener('load', function(event){
                closure();
            }, false);
            data.addEventListener('error', function(event){
                console.log('error');
                closure();
            }, false);
        }
        return data;
    } else {
        if(!this.is_set(data.link)){
            return data;
        }
        var index;
        for(index in data.link){
            if(data.link[index].substr(0, 4) === '&lt;'){
                data.link[index] = data.link[index].toString()
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');
            }
            var link = {
                "method":"append",
                "target":"head",
                "html":data.link[index]
            };
            this.content(link);
        }
        return this;
    }
}

priya.link = _('prototype').link;