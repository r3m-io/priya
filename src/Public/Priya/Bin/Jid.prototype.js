_('prototype').jid = function (list){
    if(typeof list == 'undefined'){
        list = 'priya.jid';
    }
    var data = this.collection(list);
    if(this.is_empty(data)){
    	data = 1;
    	this.collection(list, data);
    	return data;
    } else{
    	data++
    	this.collection(list, data);
    	return data;
    }
}

priya.jid = _('prototype').jid;