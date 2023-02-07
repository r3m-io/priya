_('prototype').debug = function (data){
    let string = 'Loading Debug...';
    let node = select('.debug');
    if(!node){
        node = priya.create('div', 'dialog no-select debug');
        node.html('<div class="head"><span><i class="icon fas fa-bug"></i></span><span><h2>Debug</h2></span></div><div class="menu"><ul class="tab-head"><li class="tab-debug selected"><p>Debug</p></li><li class="tab-collection"><p>Collection</p></li><li class="tab-session"><p>Session</p></li></ul></div><div class="body"><div class="tab tab-body tab-debug selected"></div><div class="tab tab-body tab-collection"></div><div class="tab tab-body tab-session"></div></div><div class="footer"><button type="button" class="button-default button-close">Close</button><button type="button" class="button-default button-debug-clear"><i class="far fa-trash-alt"></i></button></div></div>');
        let body = select('body');
        if(body){
            body.append(node);
        }        
        node.on('open', () => {
            let head = node.select('div.head');
            if(head){
                let debug = head.closest('.debug');
                if(debug){
                    debug.addClass('has-head');
                }
            }            
            let menu = node.select('div.menu');
            if(menu){
                let debug = menu.closest('.debug');
                if(debug){
                    debug.addClass('has-menu');
                }
            }
            let icon = node.select('div.icon');
            if(icon){
                let debug = icon.closest('.debug');
                if(debug){
                    debug.addClass('has-icon');
                }
            }
            let footer = node.select('div.footer');
            if(footer){
                let debug = footer.closest('.debug');
                if(debug){
                    debug.addClass('has-footer');
                }
            }
            let debug = select('.debug');
            if(debug){
                debug.addClass('display-block');
                debug.removeClass('d-none');
                let display = debug.select('.display-none');
                if(display){
                    display.removeClass('display-none');
                }
            }
        });
        node.on('close', () => {
            let debug = select('.debug');
            if(debug){
                debug.removeClass('display-block');
                debug.addClass('d-none');
            }
        });
        node.on('debug', () => {
            let head = select('.debug .tab-head li');
            if(head){
                head.removeClass('selected');
            }
            let body = select('.debug .tab-body');
            if(body){
                body.removeClass('selected');
            }
            let node = select('.debug .tab-body.tab-debug');
            if(node){
                node.addClass('selected');
            }            
        });
        node.on('debug-clear', () => {
            let debug = select('.debug .tab-body.tab-debug');
            debug.html('');
        });
        node.on('collection', () => {
            let head = select('.debug .tab-head li');
            if(head){
                head.removeClass('selected');
            }
            let body = select('.debug .tab-body');
            if(body){
                body.removeClass('selected');
            }
            let node = select('.debug .tab-body.tab-collection');
            if(node){
                node.addClass('selected');
                let collection = priya.collection();
                if (typeof JSON.decycle == "function") {
                    collection = JSON.decycle(collection);
                }
                collection = JSON.stringify(collection, null, 2);
                node.html('<pre>' + collection + '</pre>');
            }                        
        });
        node.on('session', () => {
            let head = select('.debug .tab-head li');
            if(head){
                head.removeClass('selected');
            }
            let body = select('.debug .tab-body');
            if(body){
                body.removeClass('selected');
            }
            let node = select('.debug .tab-body.tab-session');
            if(node){
                node.addClass('selected');
                let data = {};
                data.method = 'replace';
                data.target = '.tab-body.tab-session';
                request(priya.collection('url') + 'Session', data);
                node.html('<pre>Retrieving session...</pre>');
            }                
        });
        let close = node.select('.button-close');
        if(close){
            close.on('click', () => { node.trigger('close')});
        }
        let clear = node.select('.button-debug-clear');
        if(clear){
            clear.on('click', () => { node.trigger('debug-clear')});
        }
        let collection = node.select('.tab-head .tab-collection');
        if(collection){
            collection.on('click', () => { node.trigger('collection')});
        }
        let debug = node.select('.tab-head .tab-debug');
        if(debug){
            debug.on('click', () => {
                node.trigger('debug');
                this.addClass('selected');
            });
        }
        let session = node.select('.tab-head .tab-session');
        if(session){
            session.on('click', () => {
                node.trigger('session');
                this.addClass('selected');
            });
        }
    }
    let debug = select('.debug .tab-body.tab-debug');
    if(debug){
        if(typeof data == 'string'){
            if(data === 'run'){
                data = string;
            }
            let item = priya.create('pre', '');
            item.html(data);
            debug.append(item);
            node.trigger('open');
            node.trigger('debug');
            if(data === string){
                setTimeout(function(){
                    item.remove();
                }, 1500);
            }
        }
        else if(typeof data == 'object'){
            /*
            let remove = priya.collection('debug');
            if(remove){
                let index;
                for(index in remove){
                    priya.debug(index);
                    delete data.index;
                }
            }
            if (typeof JSON.decycle == "function") {
                data = JSON.decycle(data);
            }
             */
            data = JSON.stringify(data, null, 2);
            let item = priya.create('pre', '');
            item.html(data);
            debug.append(item);
            node.trigger('open');
            node.trigger('debug');
            /*
            let scrollable = debug.closest('has', 'scrollbar', 'vertical');
            scrollable.scrollbar('to', {'x': 0, 'y': scrollable.scrollbar('height')});
            node.trigger('open');
            node.trigger('debug');
             */
        } else {
            node.trigger('open');
        }
    } else {
        node.trigger('open');
    }
}

priya.debug = _('prototype').debug;