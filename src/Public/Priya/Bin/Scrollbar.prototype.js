_('prototype').scrollbar = function(attribute, type){
    if(attribute === 'y' || attribute === 'top'){
        return this.data('scrollbar-y', this.scrollTop);
    }
    if(attribute === 'x' || attribute === 'left'){
        return this.data('scrollbar-x', this.scrollLeft);
    }
    var width = this.offsetWidth - this.clientWidth;
    var height = this.offsetHeight - this.clientHeight;
    if(attribute === 'width'){
        return this.data('scrollbar-width', width);
    }
    if(attribute === 'height'){
        return this.data('scrollbar-height', height);
    }
    if(attribute === 'all'){
        var scrollbar = {
                'y': this.scrollTop,
                'x': this.scrollLeft,
                'width': width,
                'height': height
        };
        return this.data('scrollbar', scrollbar);
    }
    if(attribute === 'to'){
        this.scrollTo(type.x, type.y);
    }
    if(attribute === 'has'){
        if(type && type === 'horizontal'){
            return this.scrollWidth > this.clientWidth;
        }
        else if (type && type === 'vertical'){
            return this.scrollHeight > this.clientHeight;
        } else {
            var hasHorizontalScrollbar = this.scrollWidth > this.clientWidth;
            var hasVerticalScrollbar = this.scrollHeight > this.clientHeight;
            if(hasHorizontalScrollbar || hasVerticalScrollbar){
                return true;
            }
            return false;
        }
    }
}

priya.scrollbar = _('prototype').scrollbar;