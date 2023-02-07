_('prototype').createSelector = function(element){
    if(this.is_empty(element)){
        return '';
    }
    var selector = element.tagName;
    if(typeof selector == 'undefined' && element instanceof HTMLDocument){
        return element;
    }
    selector = selector.toLowerCase();
    if(element.id){
        selector += ' #' + element.id;
    }
    if(element.className){
        selector += ' .' + this.str_replace(' ','.',element.className);
    }
    return selector;
}

priya.createSelector = _('prototype').createSelector;