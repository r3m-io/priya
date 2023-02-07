_('prototype').is_set = function (){
    var a = arguments,
        l = a.length,
        i = 0,
        undef;
    if (l === 0) {
        return false;
    }
    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false;
        }
        i++;
    }
    return true;
}

priya.is_set = _('prototype').is_set;