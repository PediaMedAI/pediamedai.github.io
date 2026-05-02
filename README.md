# pediamedai.github.io

The PediaMed AI website — a static Hugo site deployed to GitHub Pages.

## Local development

Requirements: [Hugo extended](https://gohugo.io/installation) ≥ 0.150.

```bash
hugo server          # dev server with live reload
hugo --gc --minify   # production build into public/
```

## Repo structure

```
config.toml                              site config + main menu
content/
  pages/about/                           about page (page bundle)
  pages/contact.md                       contact page
  pages/code-of-conduct/                 code of conduct
  pages/iclr.md                          ICLR 2025 workshop page
  research/                              /research/ (custom layout)
  team/                                  6 founder content files
  publications/_index.md                 stub — data lives in data/publications.yaml
  cvpr/                                  /cvpr/ (CVPR 2026 workshop)
  workshops/_index.md                    /workshops/ aggregator
  code/_index.md                         /code/
  jobs/_index.md                         /jobs/
data/
  publications.yaml                      single source of truth: title,
                                         authors, venue, year, url, tags,
                                         featured, bibtex, arxiv
themes/pediamedai-frontier/
  theme.toml
  assets/
    scss/                                modular SCSS — _tokens, _reset,
                                         _typography, _layout, _components,
                                         _pages, _motion, _responsive, _print
    js/                                  vanilla-JS islands —
                                         theme.js (dark mode toggle),
                                         nav.js (mobile drawer),
                                         reveal.js (scroll observer),
                                         pub-filter.js (publications filter),
                                         bib-copy.js (BibTeX clipboard),
                                         hero pose-overlay is pure CSS animation
    img/                                 images processed via Hugo's pipeline
                                         (resize + WebP) — team/, partners/,
                                         workshops/ (research themes are
                                         inline SVG diagrams, not raster)
  layouts/
    _default/                            baseof, single, list, workshop
    partials/                            head, header, footer, hero,
                                         hero-pose-overlay, page-head,
                                         section-head, card, ticker,
                                         team-cell, img, meta, logo-mark
    {research,team,publications,
     workshops,code,jobs,pages}/         per-section layouts
    index.html                           home
    404.html
  static/
    fonts/                               5 self-hosted woff2 (Instrument
                                         Serif r/i, Geist 400/500,
                                         JetBrains Mono 400)
static/
  favicon-16x16.png, favicon-32x32.png,
  favicon.svg                            SVG adapts to dark/light browser
                                         chrome via embedded prefers-color-scheme
  icon-180.png, icon-192.png,
  icon-512.png                           apple-touch-icon + PWA manifest icons
  images/social-card.png                 1200x630 OpenGraph / twitter card
  images/home_logo.png                   square logo used as JSON-LD
                                         Organization logo
  site.webmanifest
  robots.txt
```

## Design system

Tokens are CSS custom properties in `_tokens.scss`. Light is the default;
`[data-theme="dark"]` flips them. The footer always uses inverse-of-body
colors so it reads correctly in both modes.

Typography pair: Instrument Serif (display + italic emphasis) + Geist
(body) + JetBrains Mono (labels / HUD). All self-hosted.

Hero artifact is a static SVG `pose-overlay` that animates a sequential
reveal via CSS only (no JS). Wrapped in `prefers-reduced-motion`.

Schema.org JSON-LD lives in `partials/meta.html`:
- Home: `Organization` + `ResearchOrganization` + `MedicalOrganization` +
  `ResearchProject` (multi-typed)
- `/publications/`: `@graph` of `ScholarlyArticle` per pub

## Deployment

GitHub Actions workflow (`.github/workflows/hugo.yml`) deploys the
`redesign` branch to GitHub Pages on every push. CI uses Hugo 0.150.

## Adding content

- **A new publication** — append an entry to `data/publications.yaml`.
  The `bibtex:` literal block is the source for the Cite disclosure on
  `/publications/`. Set `featured: true` to also surface it on
  `/research/` Selected Works.
- **A new founder** — add `content/team/<slug>.md` with frontmatter:
  `title`, `role`, `track` (clinical|technical), `weight`, `link`,
  `image` (optional theme asset path under `img/team/`), `initials`
  (fallback typographic mark), `bio`.
- **A workshop** — single page under `content/pages/<slug>.md` with
  `layout: "workshop"` and frontmatter `badge`, `subtitle`,
  `external_url`, `gallery` (list of theme-asset paths under
  `img/workshops/`), `gallery_alt_prefix`. Add a card to
  `layouts/workshops/list.html` and the homepage hero ticker.

## Content provenance

This site avoids unverified claims by policy. New copy that names a
person, partner, grant, paper, dataset, or model result must be
verifiable from the repo or explicitly approved before being added.
See git history of `redesign` for the Stage 0 content lock and
subsequent provenance audits.
