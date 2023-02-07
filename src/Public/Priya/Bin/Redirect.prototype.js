_('prototype').redirect = function (data){
    if(typeof data == 'undefined'){
        return;
    }
    if(!_('prototype').is.set(data.redirect)){
        if(typeof data == 'object'){
            return;
        }
        var data = {"redirect": data};
    }
    window.location.href = data.redirect;
    return data;
}

priya.redirect = _('prototype').redirect;