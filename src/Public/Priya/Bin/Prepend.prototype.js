_('prototype').prepend = function(node){
    this.insertBefore(node, this.children('first'));
    return this;
}

priya.prepend = _('prototype').prepend;