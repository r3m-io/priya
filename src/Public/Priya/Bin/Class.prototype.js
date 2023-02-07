_('prototype').addClass = function(className){
    var className = this.str_replace('&&', ' ', className);
    var list = className.split(' ');
    var index;
    for(index = 0; index < list.length; index++){
        var name = this.trim(list[index]);
        if(this.is_empty(name)){
            continue;
        }
        if(this.is_nodeList(this)){
            var i;
            for(i = 0; i < this.length; i++){
                var node = this[i];
                if(node.classList.contains(name) === false){
                    node.classList.add(name);
                }
            }
        } else {            
            if(this.classList && this.classList.contains(name) === false){
                if(typeof this.classList == 'object'){
                    this.classList.add(name);
                } else {
                    this.debug('error in classlist with ' + this.classname + ' ' + name);
                    console.log(this);
                }
            }
        }
    }
    return this;
}

_('prototype').getClass = function(){
    let index;
    let array = [];
    for(index=0; index < this.classList.length; index++){
        array.push(this.classList[index]);
    }
    return array.join(' ');
}

_('prototype').removeClass = function(className){
    if(!className){
        return;
    }
    var className = this.str_replace('&&', ' ', className);
    if(typeof this.className == 'undefined'){
        var index;
        for(index=0; index < this.length; index++){
            if(typeof this[index].className != 'undefined' && typeof this[index].Priya != 'undefined'){
                this[index].removeClass(className);
            }
        }
        return this;
    }
    var list = className.split(' ');
    var index;
    for(index = 0; index < list.length; index++){
        var name = this.trim(list[index]);
        if(this.is_empty(name)){
            continue;
        }
        if(this.classList.contains(name) !== false){
            this.classList.remove(name);
        }
        if(this.classList.contains(name) !== false){
            console.warn('could not remove class (' + name + ')');
        }
    }
    return this;
}

_('prototype').toggleClass = function(className){
    var className = this.str_replace('&&', ' ', className);
    if(typeof this.className == 'undefined'){
        var index;
        for(index=0; index < this.length; index++){
            if(typeof this[index].className != 'undefined' && typeof this[index].Priya != 'undefined'){
                this[index].toggleClass(className);
            }
        }
        return this;
    }
    var list = className.split(' ');
    var index;
    for(index = 0; index < list.length; index++){
        var name = this.trim(list[index]);
        if(this.is_empty(name)){
            continue;
        }
        if(this.classList.contains(name) !== false){            
            this.classList.remove(className);
        } else {
            this.classList.add(className);
        }
    }
    return this;
}

_('prototype').hasClass = function (className){
    var className = this.str_replace('&&', ' ', className);
    if(typeof this.className == 'undefined'){
        var index;
        var collection = [];
        for(index=0; index < this.length; index++){
            if(typeof this[index].className != 'undefined' && typeof this[index].Priya != 'undefined'){
                collection.push(this[index].hasClass(className));
            }
        }
        for(index=0; index < collection.length; index++){
            if(collection[index] === false){
                return false;
            }
        }
        return true;
    }
    var list = className.split(' ');
    var index;
    for(index = 0; index < list.length; index++){
        var name = this.trim(list[index]);
        if(this.is_empty(name)){
            continue;
        }
        if(this.classList.contains(name) !== false){            
            return true;
        }
    }
    return false;
}

priya.addClass = _('prototype').addClass;
priya.getClass = _('prototype').getClass;
priya.removeClass = _('prototype').removeClass;
priya.toggleClass = _('prototype').toggleClass;
priya.hasClass = _('prototype').hasClass;