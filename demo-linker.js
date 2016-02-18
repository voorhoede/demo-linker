(function(){
    'use strict';

    var defaults = {
        baseUrl: '',
        debugHash: 'debug',
        itemAttr: 'data-demo-linker-item',
        toggleSelector: '[data-demo-linker-toggle]'
    };
    var URL_ATTR = 'data-demo-linker-url';

    window.demoLinker = function(mapping, options) {
        return new DemoLinker(mapping, options);
    };

    /**
     *
     * @param {Object} mapping      with CSS selectors as keys and a value of { name: '', url: '' }.
     * @param {Object} [options]
     * @param {String} [options.baseUrl]
     * @param {String} [options.itemAttr]
     */
    function DemoLinker(mapping, options) {
        var linker = this;
        this.mapping = mapping;
        this.config = mergeObjects(defaults, options);
        this.enabled = false;

        enableIfHashMatch();
        window.addEventListener('hashchange', enableIfHashMatch, false);

        function enableIfHashMatch() {
            if(hashMatches(linker.config.debugHash)) {
                linker.enable();
            }
        }

        [].forEach.call(document.querySelectorAll(linker.config.toggleSelector), function(handle){
            handle.addEventListener('click', function(){ linker.enable(); }, false);
        });
    }

    DemoLinker.prototype.enable = function() {
        if(this.enabled) { return; }

        var mapping = this.mapping;
        var config = this.config;

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

        this.enabled = true;
    };

    DemoLinker.prototype.disable = function() {
        if(!this.enabled) { return; }

        // disable

        this.enabled = false;
    };

    DemoLinker.prototype.toggle = function() {
        return this.enabled ? this.disable() : this.enable();
    };

    function hashMatches(hash) {
        return (window.location.hash === '#' + hash);
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
        if(!element) { return false; }
        return matches(element, selector) ? element : closest(element.parentNode, selector);
    }

    // based on https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
    function matches(element, selector) {
        var context = (element.document || element.ownerDocument);
        if(!context || !context.querySelectorAll) { return false; }
        var matchingElements = context.querySelectorAll(selector),
            i = matchingElements.length;
        while (--i >= 0 && matchingElements.item(i) !== element);
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
