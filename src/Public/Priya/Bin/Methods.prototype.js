_('prototype').methods = function (){
    var result = {};
    var property;
    for(property in this){
        if(typeof this[property] != 'function'){
            continue;
        }
        result[property] = this[property];
    }
    return result;
}

priya.methods = _('prototype').methods;