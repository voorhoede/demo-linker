(function(){
    'use strict';

    /**
     * Create a Demo linker to annotate UI components and link them to wherever you want.
     *
     * @param {Object} mapping                      with CSS selectors as keys and a value of { name: '', url: '' }.
     * @param {Object} [options]
     * @param {String} [options.baseUrl]            Used as prefix for all URLs in mapping, to navigate on click.
     * @param {String} [options.itemAttr]           Attribute added to elements matching selectors in mapping, with `name` as value.
     * @param {String} [options.toggleSelector]     CSS selector used to bind elements which toggle linker on click.
     */
    window.demoLinker = function(mapping, options) {
        return new DemoLinker(mapping, options);
    };

    var defaults = {
        baseUrl: '',
        debugHash: 'debug',
        itemAttr: 'data-demo-linker-item',
        toggleSelector: '[data-demo-linker-toggle]'
    };
    var URL_ATTR = 'data-demo-linker-url';

    function DemoLinker(mapping, options) {
        var linker = this;
        var config = mergeObjects(defaults, options);

        this.config = config;
        this.enabled = false;
        this.onNavigate = navigateOnClick('[' + config.itemAttr + ']');

        if (typeof mapping === 'string') {
            getJson(mapping, function(err, json){
                if (err) { console.log('error fetching mapping JSON', err); }
                linker.mapping = json;
                linker.link();
            });
        } else {
            this.mapping = mapping;
            this.link();
        }

    }

    DemoLinker.prototype.link = function() {
        var linker = this;
        var config = this.config;
        // enable debug when hash is 'debugHash':
        enableIfHashMatch();
        window.addEventListener('hashchange', enableIfHashMatch, false);
        function enableIfHashMatch() {
            if(hashMatches(config.debugHash)) {
                linker.enable();
            }
        }

        // bind all toggle handles to linker
        [].forEach.call(document.querySelectorAll(config.toggleSelector), function(handle){
            handle.addEventListener('click', function(){ linker.toggle(); }, false);
        });
    };

    DemoLinker.prototype.enable = function() {
        var linker = this;
        if(linker.enabled) { return; }

        Object.keys(linker.mapping).forEach(function(selector) {
            var item = linker.mapping[selector];
            [].forEach.call(document.querySelectorAll(selector), function(element){
                element.setAttribute(linker.config.itemAttr, item.name);
                element.setAttribute(URL_ATTR, linker.config.baseUrl + item.url);
            });
        });
        document.body.addEventListener('click', linker.onNavigate, false);

        this.enabled = true;
    };

    DemoLinker.prototype.disable = function() {
        var linker = this;
        if(!linker.enabled) { return; }

        Object.keys(linker.mapping).forEach(function(selector) {
            [].forEach.call(document.querySelectorAll(selector), function(element){
                element.removeAttribute(linker.config.itemAttr);
                element.removeAttribute(URL_ATTR);
            });
        });
        document.body.removeEventListener('click', linker.onNavigate, false);

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
            return Object.keys(source || {}).reduce(function(result, prop){
                result[prop] = source[prop];
                return result;
            }, result);
        }, {});
    }

    /**
     * Get JSON from URL.
     *
     * @param {String} url
     * @param {Function} callback   - called with (err, json)
     */
    function getJson(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                try {
                    var json = JSON.parse(request.responseText);
                    callback(null, json);
                } catch (err) {
                    callback(err);
                }
            } else {
                callback(request);
            }
        };
        request.onerror = function() {
            callback(request);
        };
        request.send();
    }

}());
