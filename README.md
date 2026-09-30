# CDG_web — Chemical Discovery Group

Static site: plain HTML/CSS/JS, no build step, no framework. Open `index.html` in a browser
(everything is loaded with relative paths), or upload the folder as-is to GitHub Pages / any static host.

## Structure
- `index.html`: empty containers + script tags. All content is rendered from `data/`.
- `css/style.css`: design system (colours, type, layout).
- `js/scene.js`: the WebGL particle scene (about 32k particles, Three.js): protein–ligand complex → two groups → network (face-on) → small molecule.
- `js/render.js`, `js/app.js`, `js/network.js`: page rendering, routing and interactions, and the D3 people network.
- `js/vendor/`: Three.js r128 and D3 v7, vendored, so there are no runtime CDN dependencies for them.
- `data/`: all editable content (`data.site.js`, `data.groups.js`, `data.research.js`, `data.publications.js`, `data.team.js`, `data.contact.js`).
- `data/structures/abl-dasatinib-4xey.js`: real coordinates of PDB 4XEY (c-Abl kinase + dasatinib), parsed by `scripts/parse_4xey.py`. Not loaded at the moment (the scene uses illustrative shapes); add its `<script>` tag back to use it.
- `assets/`: logo (`CDG_logo-outlined.svg` is the one used) and HARDING fonts.
- `design-system/`: tokens and component notes (mirrors the Design System artifact).
- `index_v1_single-file.html`: the earlier single-file version of the site (hero + scroll story only), kept for reference.

## Editing content
Edit only the files in `data/`. Text in [square brackets] is a placeholder and is shown in amber on the page until replaced.
Pages: `#/home`, `#/research`, `#/groups` (and `#/groups/leitao`), `#/publications`, `#/contact`.
The Google Fonts stylesheet (IBM Plex) is the only external request; without it the page falls back to system fonts.
