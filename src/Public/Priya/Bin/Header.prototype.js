_('prototype').header = function(attribute, value){
    let header = priya.collection('request.header');
    if(header === null){
        header = [];
    }
    if(value === null){
        header.push(attribute);
    } else {
        let object = {};
        object[attribute] = value;
        header.push(object);
    }
    priya.collection('request.header', header);
}

priya.header = _('prototype').header;