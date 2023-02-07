_('prototype').content = function (data){
    if(Object.prototype.toString.call(priya) !== '[object Function]'){
        var priya = window.priya;
    }
    if(typeof data == 'undefined'){
        console.warn('json.content failed (data)');
        return;
    }
    if(typeof data['method'] == 'undefined'){
        return;
    }
    if(typeof data['target'] == 'undefined'){
        console.warn('json.content failed (target)');
        return;
    }
    if(typeof data['html'] == 'undefined' && (data['method'] !== 'replace' && data['method'] !== 'unwrap')){
        return;
    }
    var target = select(data['target']);
    var method = data['method'];

    if(!target){
        if(method === 'replace-or-append-to-body'){
            target = select('body');
            if(target){
                target.insertAdjacentHTML('beforeend', data['html']);
            }            
        }
        else if(method === 'replace-with-or-append-to-body'){
            target = select('body');
            if(target){
                target.insertAdjacentHTML('beforeend', data['html']);            
            }
        }
        else if(method === 'replace-or-append-to'){
            var append = data['append']['to'];
            if(append){
                target = select(append);
                if(target){
                    target.insertAdjacentHTML('beforeend', data['html']);            
                } else {
                    console.warn('cannot find append to (' + data['append']['to'] + ')');
                }
            } else {
                console.warn('data append.to is empty');
            }
        }
        else if(method === 'replace-with-or-append-to'){
            if(data['append']){
                var append = data['append']['to'];
                if(append){
                    target = select(append);
                    if(target){
                        target.insertAdjacentHTML('beforeend', data['html']);            
                    } else {
                        console.warn('cannot find append to (' + data['append']['to'] + ')');
                    }
                } else {
                    console.warn('data append.to is empty');
                }                
            } else {
                console.warn('data append.to is empty');
            }
        }
        else {
            console.warn(target);
            console.warn('no target or unknown method (' + method + ') in content');
        }
        return target;
    } else {
        if(this.is_nodeList(target)){
            var i = 0;
            for(i =0; i < target.length; i++){
                var node = target[i];
                if(method === 'replace'){
                    node.html(data['html']);
                }
                else if (method === 'replace-with'){
                    node.html(data['html'], 'outer');
                }                
                else if(method === 'replace-or-append-to-body'){
                    node.html(data['html']);                
                }
                else if(method === 'replace-or-append-to'){
                    node.html(data['html']);                
                }
                else if(method === 'replace-with-or-append-to-body'){
                    node.html(data['html'], 'outer');
                }
                else if(method === 'replace-with-or-append-to'){
                    node.html(data['html'], 'outer');
                }
                else if(method === 'append' || method === 'beforeend'){
                    node.insertAdjacentHTML('beforeend', data['html']);
                }
                else if(method === 'prepend' || method === 'afterbegin'){
                    node.insertAdjacentHTML('afterbegin', data['html']);
                }
                else if(method === 'after' || method === 'afterend'){
                    node.insertAdjacentHTML('afterend', data['html']);
                }
                else if(method === 'before' || method === 'beforebegin'){
                    node.insertAdjacentHTML('beforebegin', data['html']);
                } else {
                    console.log('unknown method (' + method + ') in content');
                }
            }
        } else {
            if(method === 'replace'){
                target.html(data['html']);
            }
            else if(method === 'replace-with'){
                target.html(data['html'], 'outer');
            }
            else if(method === 'replace-or-append-to-body'){
                target.html(data['html']);                
            }
            else if(method === 'replace-or-append-to'){
                target.html(data['html']);                
            }
            else if(method === 'replace-with-or-append-to-body'){
                target.html(data['html'], 'outer');
            }
            else if(method === 'replace-with-or-append-to'){
                target.html(data['html'], 'outer');
            }
            else if(method === 'append' || method === 'beforeend'){
                target.insertAdjacentHTML('beforeend', data['html']);
            }
            else if(method === 'prepend' || method === 'afterbegin'){
                target.insertAdjacentHTML('afterbegin', data['html']);
            }
            else if(method === 'after' || method === 'afterend'){
                target.insertAdjacentHTML('afterend', data['html']);
            }
            else if(method === 'before' || method === 'beforebegin'){
                target.insertAdjacentHTML('beforebegin', data['html']);
            } else {
                console.log('unknown method (' + method + ') in content');
            }
        }
        return target;
    }
}

priya.content = _('prototype').content;