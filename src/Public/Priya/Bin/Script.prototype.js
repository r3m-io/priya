_('prototype').script = function (data, closure){
    if(typeof data == 'undefined'){
        return;
    }
    if(this.is_set(data.src) && this.is_set(data.type) && data.type === 'text/javascript'){
        let script = priya.create('script', data.src);
        priya.select('head').appendChild(script);
        priya.load++;
        script.addEventListener('load', function(event){
            priya.load--;
        }, false);
        if(closure){
            script.addEventListener('load', function(event){
                closure();
            }, false);
        }
        return script;
    }
    if(typeof attempt == 'undefined'){
        attempt = 0;
    }
    if(parseInt(priya.load) !== 0 && attempt < 500){
        setTimeout(function(){
            priya.script(data, ++attempt);
            priya.hit++;
        }, parseFloat(1000/30));
        return data;
    }
    if(!this.is_set(data.script)){
        return data;
    }
    var index;
    for(index in data.script){
        if(data.script[index].substr(0, 4) === '&lt;'){
            data.script[index] = data.script[index].toString()
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
        }
        this.addScriptSrc(data.script[index]);
        this.addScriptText(data.script[index]);
    }
    return this;
}

_('prototype').addScriptSrc = function (data){
    var tag = this.readTag(data);
    if(!this.is_set(tag['tagName']) || tag['tagName'] !== 'script'){
        return;
    }
    if(!this.is_set(tag['src'])){
        return;
    }
    var element = document.createElement(tag.tagName);
    var index;
    for(index in tag){
        if(index === 'tagName'){
            continue;
        }
        element.setAttribute(index, tag[index]);
    }
    document.getElementsByTagName("head")[0].appendChild(element);
}

_('prototype').addScriptText = function (data){
    var tag = this.readTag(data);
    if(!this.is_set(tag['tagName']) || tag['tagName'] !== 'script'){
        return;
    }
    var temp = this.explode('<'+tag.tagName, data);
    if(!this.is_set(temp[1])){
        return;
    }
    temp = this.explode('</' +tag.tagName, temp[1]);
    temp = this.explode('>', temp[0]);
    temp.shift();
    var text = this.trim(this.implode('>', temp));
    delete temp;
    if(this.is_empty(text)){
        return;
    }
    var element = document.createElement(tag.tagName);
    var index;
    for(index in tag){
        if(index === 'tagName'){
            continue;
        }
        if(this.stristr(index, '[') !== false){
            continue;
        }
        if(this.stristr(index, '\'') !== false){
            continue;
        }
        element.setAttribute(index, tag[index]);
    }
    element.text = text;
    document.getElementsByTagName("head")[0].appendChild(element);
}

_('prototype').readTag = function (data){
    var temp = this.explode('>', this.trim(data));
    temp = this.explode(' ', this.trim(temp[0]));
    var index;
    var tag = {
        "tagName": temp[0].substr(1)
    };
    for (index in temp){
        var key = this.explode('="', temp[index]);
        var value = this.explode('"',key[1]);
        key = key[0];
        if(this.is_empty(value)){
            continue;
        }
        value.pop();
        value = this.implode('"', value);
        tag[key] = value;
    }
    return tag;
}

priya.script = _('prototype').script;
priya.addScriptSrc = _('prototype').addScriptSrc;
priya.addScriptText = _('prototype').addScriptText;
priya.readTag = _('prototype').readTag;