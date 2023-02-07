_('prototype').off = function (event, action){
    this.removeEventListener(event, action)
}

priya.off = _('prototype').off;