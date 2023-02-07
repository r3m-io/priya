_('prototype').next = function (tagName){
    console.warn('Deprecated, use element.nextSibling or element.nextElementSibling');
    if(!tagName){
        tagName = this.tagName;
    }
    var parent = this.parentNode;
    var index;
    var found;
    for(index = 0; index < parent.childNodes.length; index++){
        var child = parent.childNodes[index];
        if(child.isEqualNode(this)){
            found = true;
            continue;
        }
        if(!is.empty(found)){
            if(typeof child.tagName == 'undefined'){
                continue;
            }
            if(child.tagName.toLowerCase() === tagName.toLowerCase()){
                found = child;
                break;
            }
        }
    }
    if(found !== true && !is.empty(found)){
        return attach(found);
    }
}

priya.next = _('prototype').next;