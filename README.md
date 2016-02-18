# Demo linker

Annotate UI components and link them to wherever you want.

This is mostly useful for linking components in any view to their
related documentation, section in a living style guide, etc.


## Usage

Include `demo-linker.css` and `demo-linker.js` at the end of your page:

```html
<link  href="path/to/demo-linker.css" rel="stylesheet">
<script src="path/to/demo-linker.js"></script>
```

Start `demoLinker` with a `mapping`.

```html
<script>
window.demoLinker(
    /* mapping */ {
        '.navbar': {
            name: 'Navbar',
            url: 'https://getbootstrap.com/components/#navbar'
        },
        '[data-toggle="collapse"]': {
            name: 'Collapse',
            url: 'https://getbootstrap.com/javascript/#collapse'
        }
    }
);
</script>
```

Additionally you can pass `options`, like a `baseUrl`.

```html
<script>
window.demoLinker(
    /* mapping */ {
        '.navbar': {
            name: 'Navbar',
            url: 'components/#navbar'
        },
        '[data-toggle="collapse"]': {
            name: 'Collapse',
            url: 'javascript/#collapse'
        }
    },
    /* options */ {
        'baseUrl': 'https://getbootstrap.com/'
    }
);
</script>
```
