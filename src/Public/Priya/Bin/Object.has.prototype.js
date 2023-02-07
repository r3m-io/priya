_('prototype').object_has = function(attributeList, object){
    if(this.is_empty(object)){
        return false;
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
        return false;
    }
    var key;
    for (key in attributeList){
        if(this.is_empty(key)){
            continue;
        }
        var attribute = attributeList[key];
        if(this.is_set(object[key])){
            return true;
        }
    }
    return false;
}

priya.object_has = _('prototype').object_has;