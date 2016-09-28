(function(demoLinker){
    'use strict';

    var mapping = {
        '.navbar': {
            name: 'Navbar',
            url: 'components/#navbar'
        },
        '[data-toggle="collapse"]': {
            name: 'Collapse',
            url: 'javascript/#collapse'
        },
        '.carousel': {
            name: 'Carousel',
            url: 'javascript/#carousel'
        },
        '.media': {
            name: 'Media object',
            url: 'components/#media'
        }
    };
    var options = {
        'baseUrl': 'https://getbootstrap.com/',
		'rainbow': true
    };

    demoLinker(mapping, options);

}(window.demoLinker));
