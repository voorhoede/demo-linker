(function(){
    'use strict';

    var defaults = {
        baseUrl: '',
        itemAttr: 'data-demo-linker-item'
    };
    var URL_ATTR = 'data-demo-linker-url';

    window.viewLinker = viewLinker;

    /**
     *
     * @param {Object} mapping
     * @param {Object} [options]
     */
    function viewLinker(mapping, options) {
        var config = mergeObjects(defaults, options);

        Object.keys(mapping).forEach(function(selector) {
            var label = mapping[selector].name;
            var url = mapping[selector].url;
            var elements = [].slice.call(document.querySelectorAll(selector));

            elements.forEach(function(element){
                element.setAttribute(config.itemAttr, label);
                element.setAttribute(URL_ATTR, config.baseUrl + url);
            });
        });

        document.body.addEventListener('click', navigateOnClick('['+config.itemAttr+']'), false);
    }

    function navigateOnClick(selector) {
        return function(event) {
            var item = closest(event.target, selector);
            if(item){
                event.preventDefault();
                event.stopPropagation();
                window.location = item.getAttribute(URL_ATTR);
            }
        };
    }

    function closest (element, selector) {
        return matches(element, selector) ? element : closest(element.parentNode, selector);
    }

    // borrowed from https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
    function matches(element, selector) {
        var matches = (element.document || element.ownerDocument).querySelectorAll(selector),
            i = matches.length;
        while (--i >= 0 && matches.item(i) !== element);
        return i > -1;
    }

    function mergeObjects(/* source1, source2, ..., sourceN */) {
        var sources = [].slice.call(arguments);
        return sources.reduce(function(result, source){
            return Object.keys(source).reduce(function(result, prop){
                result[prop] = source[prop];
                return result;
            }, result);
        }, {});
    }

}());
