# Nelli Space

A photo-led personal portfolio for photography, moving image, code, and research. The selected work is organized into five editorial series: Street, Outdoor, Wedding, Band, and Portrait.

## Local preview

Serve the `dist` directory with any static web server, for example:

```sh
python3 -m http.server 4173 --directory dist
```

Then open `http://localhost:4173`.

## Editing content

- Page copy and gallery structure: `dist/index.html`
- Photo-series subpages: `dist/journal/`
- Visual design and responsive layout: `dist/styles.css`
- Lightbox, reveal effects, darkroom mode, and interactions: `dist/script.js`
- Optimized portfolio images: `dist/assets/photos/` and `dist/assets/journal/`

The photography section uses optimized WebP copies, leaving the original image files untouched.
