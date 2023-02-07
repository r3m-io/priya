_('prototype').closest = function(attribute, node, type){
    var parent;    
    if(this.function_exist(node)){
        parent = this.parent();
        if(parent === false){
            var priya = this.attach(this.create('element', attribute));
            priya.data('selector', attribute);
            return priya;
        }
        var bool = parent[node](attribute, type);
        if(bool === false){
            parent = parent.closest(attribute, node, type);
        }
        return this.attach(parent);
    } else {
        if(typeof node == 'undefined'){
            if(typeof this.parent != 'function'){
                var priya = this.attach(this.create('element', attribute));
                priya.data('selector', attribute);
                return priya;
            } else {
                parent = this.parent();
                parent = this.attach(parent);
            }
        } else {
            parent = node.parent();
            parent = this.attach(parent);
        }
        if(parent === false){
            var priya = this.attach(this.create('element', attribute));
            priya.data('selector', attribute);
            return priya;
        }
        if(this === parent && parent === node){
            parent = this.attach(this.parentNode);
        }
        if(
            typeof attribute.toLowerCase === 'function' &&
            parent.tagName.toLowerCase() === attribute.toLowerCase()
        ){
            parent = this.attach(parent);
            return parent;
        }

        var select = parent.select(attribute);
        if(!select){
            select = parent.closest(attribute, parent);
        }
        /*
        if(select === false){
            select = parent.closest(attribute, parent);
        }
        */
        var select = this.attach(select);
        return select;
    }
}

priya.closest = _('prototype').closest;