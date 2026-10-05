# CDG_web — Chemical Discovery Group

Static site: plain HTML/CSS/JS, no build step, no framework, all paths relative.

## Folders
- `index.html` — empty containers + script tags (do not edit content here).
- `data/` — **all editable content** (English, the base version): `data.site.js` (home), `data.groups.js` (PIs, groups),
  `data.team.js` (members + past members), `data.research.js`, `data.publications.js`, `data.contact.js`,
  `data.news.js` (news / blog posts), `data.ui.js` (small interface labels).
- `data/data.pt.js` — the **Portuguese (Brazil)** version of all of the above.
- `photos/` — people photos, named `POSITION_GROUP_Full Name.ext`; past members in `photos/PastMembers/`.
  After adding a photo, reference it in `data.team.js` / `data.groups.js`.
- `assets/` — logo and HARDING fonts.
- `css/`, `js/` — design and code (`js/vendor/` = Three.js and D3, vendored).

## News (blog)
Posts live in `data/data.news.js`. The 3 most recent appear on the home page (after the molecule section);
all of them are on the News page (`#/news`), and each opens at `#/news/<slug>`. To add one, copy a block,
change `slug`, `date`, `tags`, `title`, `summary` and `body` (one string per paragraph), and add the
Portuguese with `_pt` fields (`title_pt`, `summary_pt`, `body_pt`, `tags_pt`). Images go in `photos/news/`.

## Languages (EN / PT)
The flags in the header switch the site between English (US) and Portuguese (Brazil). The choice is remembered
in the browser; first visit uses the browser language; `?lang=pt` or `?lang=en` in the address forces one.
- Edit English in `data/data.*.js`, Portuguese in `data/data.pt.js` (same structure; lists of cards/projects match by order).
- Shortcut for people: in `data.team.js`, put `bio_pt: "…"` next to `bio: "…"` (works for any field: `field_pt`).
- If you add a card/project/group in English, add its translation at the same position in `data.pt.js`; until then it shows in English.

Text in [square brackets] is a placeholder, shown in amber until replaced.

## Publishing on GitHub Pages
1. Put the contents of this folder at the root of a repository (`index.html` must be at the top level).
2. Settings → Pages → Deploy from a branch → `main` / root.
3. The site is served at `https://<user>.github.io/<repo>/`. Links use hashes (`#/groups`), so no server rules are needed.

File names are case-sensitive on GitHub: keep the exact spelling used in the data files.
