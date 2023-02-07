_('prototype').request = function (url, data, script){
    const request = this;
    let type = 'GET';
    if(typeof url == 'object' && url !== null){
        data = url;
        url = '';
        if (typeof data.altKey != "undefined") {//event
            priya.debug('event');
            let event = data;
            url = request.data('url');
            data = request.data();
            delete data.request;
        }
    }
    if(_('prototype').is_empty(url)){
        if(typeof request.data == 'function'){
            url = request.data('url');
        }
    }    
    if(_('prototype').is_empty(url)){
        return;
    }
    let has_request_method = false;
    if(_('prototype').is_empty(data)){
        if(!_('prototype').is_empty(request.tagName) && request.tagName === 'FORM'){
            data = request.data('serialize');
            let number;
            for(number in data){
                let attribute = data[number];
                if(!_('prototype').is_empty(attribute.name) && attribute.name === 'request-method'){
                    type = attribute.value;
                    delete data[number];
                    has_request_method = true;
                }
            }
        } else {            
            if(typeof request.data != 'undefined'){
                data = request.data();
                let number;
                for(number in data){
                    let attribute = data[number];
                    if(!_('prototype').is_empty(attribute.name) && attribute.name === 'request-method'){
                        type = attribute.value;
                        delete data[number];
                        has_request_method = true;
                    }
                }
            }            
        }
    }
    if(has_request_method === true){
        //intended
    } else {
        if(_('prototype').is_empty(data)){
            type = 'GET';
        } else {
            let tmpData = data;
            delete tmpData['mtime'];
            if(_('prototype').is_empty(tmpData)){
                type = 'GET';
            }
            let is_found = false;
            let number;
            for(number in tmpData){
                if(tmpData[number]?.name === 'request-method'){
                    type = tmpData[number].value;
                    delete tmpData[number];
                    delete data[number];
                    is_found = true;
                    break;
                }
            }
            if(is_found){
                //type = is_found type
            }
            else if(!_('prototype').is_empty(tmpData['request-method'])){
                type = tmpData['request-method'];
                delete tmpData['request-method'];
                delete data['request-method'];
            }
            else if(!_('prototype').is_empty(tmpData['request']) && !_('prototype').is_empty(tmpData['request']['method'])) {
                type = tmpData['request']['method'];
                delete tmpData['request']['method'];
                delete data['request']['method'];
                if(_('prototype').is_empty(tmpData['request'])){
                    delete tmpData['request'];
                    delete data['request'];
                }
            } else {
                type = 'POST';
            }
        }
    }
    const xhttp = new XMLHttpRequest();
    let header = priya.collection('request.header');
    priya.collection('delete', 'request.header');
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4) {
            if(xhttp.responseText.substr(0, 1) === '{' && xhttp.responseText.substr(-1) === '}'){
                const data = JSON.parse(xhttp.responseText);
                if(_('prototype').is_empty(data.trace)){
                    priya.link(data);
                    priya.styler(data);
                    priya.script(data);
                    priya.content(data);
                    priya.redirect(data);
                    if(typeof script == 'function'){
                        script(url, data);
                    }
                } else {
                    priya.exception(data);
                    if(typeof script == 'function'){
                        script(url, data);
                    }
                }
                return;
            }
            if(xhttp.responseText.substr(0, 1) === '[' && xhttp.responseText.substr(-1) === ']'){
                const data = JSON.parse(xhttp.responseText);
                if(typeof script == 'function'){
                    script(url, data);
                }
            } else {
                if(!_('prototype').is_empty(_('exception'))){
                    // intended
                } else {
                    if (xhttp.responseText) {
                        priya.debug(xhttp.responseText);
                    }
                }
                if(typeof script == 'function'){
                    script(url, xhttp.responseText);
                }
            }
        } else {
            if(xhttp.readyState === 0){
                // unsent
            }
            else if (xhttp.readyState === 1){
                // opened
            }
            else if(xhttp.readyState === 2){
                // header received
            }
            if(xhttp.readyState === 3){
                 // loading
            }
        }
    };
    if(type === 'GET'){
        let urlEncodedDataPairs = [];
        let name;
        for( name in data ) {
            urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(data[name]));
        }
        let params = '';
        let split = url.split('?');
        if(split.length === 2){
            params = urlEncodedDataPairs.join('&');
        }
        else if (urlEncodedDataPairs.length >= 1) {
            params = '?' + urlEncodedDataPairs.join('&');
        }
        priya.collection('request.microtime', microtime(true));
        xhttp.open(type, url + params, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        if(header !== null){
            let index;
            for(index=0; index < header.length; index++){
                let request_header = header[index];
                let attribute;
                for(attribute in request_header){
                    xhttp.setRequestHeader(attribute, request_header[attribute]);
                }
            }
        }
        xhttp.send();
    } else {
        priya.collection('request.microtime', microtime(true));
        xhttp.open(type, url, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        if(header !== null){
            let index;
            for(index=0; index < header.length; index++){
                let request_header = header[index];
                let attribute;
                for(attribute in request_header){
                    xhttp.setRequestHeader(attribute, request_header[attribute]);
                }
            }
        }
        if (typeof JSON.decycle == "function") {
            data = JSON.decycle(data);
        }
        console.log(data);
        const send = JSON.stringify(data);
        xhttp.send(send);
    }
}

priya.request = _('prototype').request;