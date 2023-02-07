_('prototype').explode_multi = function(delimiter, string, limit){
    var result = [];
    var index;
    for(index =0; index < delimiter.length; index++){
        var delim = delimiter[index];
        if(typeof limit != 'undefined' && this.is_set(limit[index])){
            var tmp = this.explode(delim. string. limit[index]);
        } else {
            var tmp = this.explode(delim, string);
        }
        if(tmp.length === 1){
            continue;
        }
        var i;
        for(i = 0; i < tmp.length; i++){
            var value = tmp[i];
            result.push(value);
        }
    }
    if(this.is_empty(result)){
        result.push(string);
    }
    return result;
}

priya.explode_multi = _('prototype').explode_multi;