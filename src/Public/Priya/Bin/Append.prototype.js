//might not work anymore use appendChild instead...
_('prototype').append = function(node){
    this.appendChild(node);
    return this;
}

priya.append = _('prototype').append;