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

Or the URL of the mapping:

```html
<script>
window.demoLinker('path/to/mapping.json');
</script>
```

Additionally you can pass `options`, like a `baseUrl` or `rainbow`

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
    /* options */
    {
        baseUrl: 'https://getbootstrap.com/',
    /* add rainbow colored outlines */
        rainbow: true
    }
);
</script>
```

Or

```html
<script>
window.demoLinker('path/to/mapping.json', { baseUrl: 'https://getbootstrap.com/' });
</script>
```

## Examples
- [Bootstrap v3](examples/bootstrap-v3/)
- [Bootstrap v3, annotated on start](examples/bootstrap-v3/#debug)
- [Bootstrap v3, annotated on start with rainbow colors](examples/bootstrap-v3-rainbow/#debug)
- [Mapping in external JSON file](examples/bootstrap-v3-json/)
- [Mapping in external JSON file, annotated on start](examples/bootstrap-v3-json/#debug)

## License

[MIT licensed](LICENSE) © [De Voorhoede](https://www.voorhoede.nl/)
