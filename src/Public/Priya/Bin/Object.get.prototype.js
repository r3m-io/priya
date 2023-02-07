_('prototype').object_get = function(attributeList, object){
    if(this.is_empty(object)){
        return null;
    }
    if(typeof attributeList == 'string'){
        attributeList = this.explode_multi(['.', ':', '->'], attributeList);
        var key;
        for(key in attributeList){
            if(this.is_empty(attributeList[key])){
                delete attributeList[key];
            }
        }
    }
    if(this.is_array(attributeList)){
        attributeList = this.object_horizontal(attributeList);
    }
    if(this.is_empty(attributeList)){
        return object;
    }
    var key;
    for (key in attributeList){
        if(this.is_empty(key)){
            continue;
        }
        var attribute = attributeList[key];
        if(this.is_set(object[key])){
            return this.object_get(attributeList[key], object[key]);
        }
    }
    return null;
}

priya.object_get = _('prototype').object_get;