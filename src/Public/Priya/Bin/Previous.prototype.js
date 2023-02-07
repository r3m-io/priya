_('prototype').previous = function (tagName){
    console.warn('Deprecated, use element.previousSibling or element.previousElementSibling');
    if(!tagName){
        tagName = this.tagName;
    }
    var parent = this.parentNode;
    var index;
    var found;
    var nodeList = parent.childNodes;
    for(index = nodeList.length-1; index >= 0; index--){
        var child = nodeList[index];
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
    return null;
}

priya.previous = _('prototype').previous;