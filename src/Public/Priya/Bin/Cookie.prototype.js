_('prototype').cookie = function (attribute, value){
    console.log(attribute);
    console.log(value);
    const cookie = document.cookie;
    console.log(cookie);
}

priya.cookie = _('prototype').cookie;