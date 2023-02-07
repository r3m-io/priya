_('prototype').data = function (attribute, value){
    if(attribute === 'remove' || attribute === 'delete'){
        if(this.attribute('has', 'data-' + value)){
            return this.attribute('remove','data-' + value);
        } else {
            var data = this.data(value);
            if(typeof data == 'object'){
                var attr;
                var result = false;
                for(attr in data){
                    this.data('remove', value + '-' + attr);
                    result = true;
                }
                return result;
            } else {
                return
            }
        }
    }
    else if (attribute === 'clear' && value === 'error'){
        if(this.tagName === 'FORM'){
            /*
             * clear errors from form
             */
            var input = this.select('input');
            var textarea = this.select('textarea');
            var select = this.select('select');
            var dropdown = this.select('.dropdown');
            var index;
            if(this.is_nodeList(input)){
                for(index=0; index < input.length; index++){
                    var elem = input[index];
                    elem.removeClass('error');
                }
            } else if(input) {
                input.removeClass('error');
            }
            if(this.is_nodeList(textarea)){
                 for(index=0; index < textarea.length; index++){
                     var elem = textarea[index];
                     elem.removeClass('error');
                 }
            } else if(textarea) {
                textarea.removeClass('error');
            }
            if(this.is_nodeList(select)){
                for(index=0; index < select.length; index++){
                    var elem = select[index];
                    elem.removeClass('error');
                }
            } else if(select) {
                select.removeClass('error');
            }
            if(this.is_nodeList(dropdown)){
                for(index=0; index < dropdown.length; index++){
                    var elem = select[index];
                    elem.removeClass('error');
                }
            } else if(dropdown){
                dropdown.removeClass('error');
            }
        }
    }
    else if (attribute === 'serialize'){
        if(this.tagName === 'FORM'){
            /*
             * return all data for form
             */
            var data = this.data();
            var input = this.select('input');
            var textarea = this.select('textarea');
            var select = this.select('select');
            var index;
            value = [];
            for(index in data){
                var object = {};
                object.name = index;
                object.value = data[index];
                value.push(object);
            }
            if(this.is_nodeList(input)){
                var collection = {};
                for(index=0; index < input.length; index++){
                    if(this.is_empty(input[index].name)){
                        continue;
                    }
                    if(input[index].type === 'radio' && input[index].checked !== true){
                        continue;
                    }
                    if(input[index].type === 'checkbox' && input[index].checked !== true){
                        continue;
                    }
                    if(this.stristr(input[index].name, '[]')){
                        if(!this.is_set(collection[input[index].name])){
                            collection[input[index].name] = {};
                            collection[input[index].name].name = input[index].name.split('[]').join('');
                            collection[input[index].name].value = [];
                        }
                        collection[input[index].name].value.push(input[index].value);
                    } else {
                        var object = {};
                        object.name = input[index].name;
                        object.value = input[index].value;
                        value.push(object);
                    }
                }
                for(name in collection){
                    value.push(collection[name]);
                }
            } else {
                if(!this.is_empty(input.name)){
                    var object = {};
                    object.name = input.name.split('[]').join('');
                    object.value = input.value;
                    value.push(object);
                }
            }
            if(this.is_nodeList(textarea)){
                var collection = {};
                for(index=0; index < textarea.length; index++){
                    if(this.is_empty(textarea[index].name)){
                        continue;
                    }
                    if(this.stristr(textarea[index].name, '[]')){
                        if(!this.is_set(collection[textarea[index].name])){
                            collection[textarea[index].name] = {};
                            collection[textarea[index].name].name = textarea[index].name.split('[]').join('');
                            collection[textarea[index].name].value = [];
                        }
                        collection[textarea[index].name].value.push(textarea[index].value);
                    } else {
                        var object = {};
                        object.name = textarea[index].name;
                        object.value = textarea[index].value;
                        value.push(object);
                    }
                }
                for(name in collection){
                    value.push(collection[name]);
                }
            } else {
                if(!this.is_empty(textarea.name)){
                    var object = {};
                    object.name = textarea.name.split('[]').join('');
                    object.value = textarea.value;
                    value.push(object);
                }
            }
            if(this.is_nodeList(select)){
                var collection = {};
                for(index=0; index < select.length; index++){
                    if(this.is_empty(select[index].name)){
                        continue;
                    }
                    if(this.stristr(select[index].name, '[]')){
                        if(!this.is_set(collection[select[index].name])){
                            collection[select[index].name] = {};
                            collection[select[index].name].name = select[index].name.split('[]').join('');
                            collection[select[index].name].value = [];
                        }
                        collection[select[index].name].value.push(select[index].value);
                    } else {
                        var object = {};
                        object.name = select[index].name;
                        object.value = select[index].value;
                        value.push(object);
                    }
                }
                for(name in collection){
                    value.push(collection[name]);
                }
            } else {
                if(!this.is_empty(select.name)){
                    var object = {};
                    object.name = select.name.split('[]').join('');
                    object.value = select.value;
                    value.push(object);
                }
            }
            return value;
        }
    } else {
        if(typeof attribute === 'undefined' || attribute === 'ignore' || attribute === 'select'){
            var select = value;
            var attr;
            value = {};
            for (attr in this.attributes){
                if(typeof this.attributes[attr].value == 'undefined'){
                    continue;
                }
                var key = this.stristr(this.attributes[attr].name, 'data-');
                if(key === false){
                    continue;
                }
                key = this.attributes[attr].name.substr(5);
                if(attribute === 'ignore'){
                    if(typeof select == 'string' && key == select){
                        continue;
                    }
                    if(typeof select == 'object' && this.in_array(key, select)){
                        continue;
                    }
                }
                if(attribute === 'select'){
                    if(typeof select == 'string' && key != select){
                        continue;
                    }
                    if(typeof select == 'object' && !this.in_array(key, select)){
                        continue;
                    }
                }
                var split = key.split('.');
                if(split.length === 1){
                    value[key] = this.attributes[attr].value;
                } else {
                    var object = this.object_horizontal(split, this.attributes[attr].value);
                    value = this.object_merge(value, object);
                }
            }
            return value;
        }
        else if(typeof attribute === 'object'){
            for(attr in attribute){
                this.data(attr, attribute[attr]);
            }
        } else {
            if(attribute === 'has'){
                if(this.attribute('has', 'data-' + value)){
                    return true;
                }
                return false;
            }
            var data = this.attribute('data-' + attribute, value);
            if(this.is_empty(data) && data !== '0' &&  data !== '' && !this.is_empty(attribute)){
                data = this.data();
                var collection = {};
                /*
                for(key in data){
                    console.log(key);
                    console.log(attribute);
                    if(this.stristr(key, attribute) !== false){
                        collection[this.str_replace(attribute + '-', '', key)] = data[key];
                    }
                }
                 */
                if(this.is_empty(collection)){
                    return null;
                } else {
                    return collection;
                }
            } else {
                return data;
            }
        }
    }
}

priya.data = _('prototype').data;