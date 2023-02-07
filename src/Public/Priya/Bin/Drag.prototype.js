_('prototype').drag = function (handle, subject, callback) {
    this.collection('drag.handle', handle);
    this.collection('drag.subject', subject);
    this.collection('drag.callback', callback);
    handle.on('mousedown', this.dragMouseDown)
    document.addEventListener('mousemove', this.dragMouseMove);
    document.addEventListener('mouseup', this.dragMouseUp);   
}

_('prototype').dragMouseDown = function(event){
	var section = this.collection('drag.subject');
	if(!section){
		return;
	}
	var size = this.collection('drag.size');
	if(!size){
		var size = section.calculate('all');
		this.collection('drag.size', size);
	}	
	var state = {}
	state.isDragging = true;
	state.x = size.left;
	state.y = size.top;
	state.width = size.width;
	state.height = size.height;
	state.xDiff = event.pageX - state.x;
	state.yDiff = event.pageY - state.y;	
	state.dialog = section;
    this.collection('drag.state', state);	
    callback = this.collection('drag.callback');
    if(typeof callback == 'function'){
		callback();
	}
}

_('prototype').dragClampX = function(n){
	var size = this.collection('drag.size');	
    return Math.min(Math.max(n, 0), size.window.width);
}

_('prototype').dragClampY = function(n){
	var size = this.collection('drag.size');
    return Math.min(Math.max(n, 0), size.window.height);
}

_('prototype').dragMouseMove = function(event){
	state = this.collection('drag.state');	
	if(
		state && 
		state.isDragging
	){
		state.x = this.dragClampX(event.pageX - state.xDiff);
		state.y = this.dragClampY(event.pageY - state.yDiff);
		state.dialog.css('left',  state.x + 'px');
		state.dialog.css('top', state.y + 'px');
		this.collection('drag.state', state);		
	}	
}

_('prototype').dragMouseUp = function(event){
	state = this.collection('drag.state');
	if(state){
		state.isDragging = false;
		this.collection('drag.state', state);
		var section = this.collection('drag.subject');
		if(!section){
			return;
		}
		var size = section.calculate('all');
		this.collection('drag.size', size);
	}	
}

priya.drag = _('prototype').drag;
priya.dragMouseDown = _('prototype').dragMouseDown;
priya.dragClampX = _('prototype').dragClampX;
priya.dragClampY = _('prototype').dragClampY;
priya.dragMouseMove = _('prototype').dragMouseMove;
priya.dragMouseUp = _('prototype').dragMouseUp;