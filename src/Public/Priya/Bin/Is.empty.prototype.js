_('prototype').is_empty = function (mixed_var){
    var key;
     if (
        mixed_var === "" ||
        mixed_var === 0 ||
        mixed_var === "0" ||
        mixed_var === null ||
        mixed_var === false ||
        typeof mixed_var === 'undefined') {
        return true;
    }
    if (typeof mixed_var == 'object') {
        for (key in mixed_var) {
            return false;
        }
        return true;
    }
    return false;
}

if(typeof priya != 'undefined'){
    priya.is_empty = _('prototype').is_empty;
}