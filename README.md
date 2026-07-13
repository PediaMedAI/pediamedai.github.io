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
  publications.yaml                      publications + preprints (see file
                                         header for full schema)
  currently.yaml                         "Currently · ..." line above the
                                         hero kicker (single text field)
  hero_pose.yaml                         pose-overlay keypoints, bones,
                                         and bar order for the hero SVG
  repos.yaml                             cached GitHub-repo metadata for
                                         the /code/ page; live API call
                                         is the runtime fallback
  news.yaml                              dated lab updates — homepage
                                         "Updates" section (latest 4) +
                                         full log on /about/#updates
  leaderboard.yaml                       Children's Gait Competition
                                         leaderboard on /cvpr/ (empty-state
                                         until real results exist)
themes/pediamedai-frontier/
  theme.toml
  assets/
    scss/                                modular SCSS:
      _tokens, _reset, _typography,        root modules (design tokens,
      _layout, _components, _motion,       browser reset, type scale,
      _responsive, _print                  grid, components, motion,
                                           media-query overrides, print)
      pages/                               page-scoped: _hero, _home,
                                           _theme, _team, _pub, _footer,
                                           _workshop, _misc
      style.scss                           import manifest
    js/                                  vanilla-JS islands (deferred;
                                         scripts.html ships them as one
                                         global bundle (concat of 4) plus
                                         section-gated extras: a
                                         publications bundle (concat of 2)
                                         and lightbox.js standalone on
                                         workshop pages):
                                         theme.js (dark mode toggle),
                                         nav.js (mobile drawer),
                                         reveal.js (scroll observer; CSS
                                         scroll-driven enhancement layered
                                         on top via @supports),
                                         prefetch.js (hover prefetch
                                         fallback for non-Chromium —
                                         Speculation Rules cover Chromium),
                                         pub-filter.js (publications filter),
                                         bib-copy.js (BibTeX clipboard),
                                         lightbox.js (workshop gallery
                                         dialog, native <dialog>).
                                         Hero pose-overlay is pure CSS.
    img/                                 images processed via Hugo's pipeline
                                         (resize + WebP + 1x/2x srcset) —
                                         team/, partners/, workshops/.
                                         Research themes are inline SVG
                                         diagrams emitted by diagram-*
                                         partials, not raster.
  layouts/
    _default/                            baseof, single, list, workshop
    partials/                            chrome: head, header, footer,
                                         scripts, meta;
                                         page furniture: hero,
                                         hero-pose-overlay, ticker,
                                         page-head, page-meta, section-head;
                                         components: card, img, team-cell,
                                         team-section, logo-mark,
                                         github-repo-meta;
                                         research SVG: diagram-aggpose,
                                         diagram-lrformer, diagram-vitasd
    {research,team,publications,
     workshops,code,jobs,pages}/         per-section layouts
    index.html                           home
    404.html
    sitemap.xml                          custom sitemap with per-Kind
                                         priority defaults (home=1.0,
                                         sections=0.8, team singles=0.7,
                                         other singles=0.5)
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

Schema.org JSON-LD lives in `partials/meta.html` and `team/single.html`:
- Home: `Organization` + `ResearchOrganization` + `MedicalOrganization` +
  `ResearchProject` (multi-typed)
- Every non-home, non-404 page: `BreadcrumbList` (auto-derived from URL)
- Workshop pages (`layout: "workshop"`): `Event` (uses `dates`,
  `enddates`, `location`, `event_image` frontmatter)
- Team singles: `Person` (with `memberOf` pointing at the home org)
- `/publications/`: `@graph` of `ScholarlyArticle` per pub

## Deployment

GitHub Actions workflow (`.github/workflows/hugo.yml`) deploys the
`redesign` branch to GitHub Pages on every push. CI uses Hugo 0.163,
caches Hugo's resource cache between runs, and fails the build if any
internal link in the output is broken
(`scripts/check_internal_links.py`).

## Adding content

- **A new publication** — append an entry to `data/publications.yaml`
  (the file's header comment documents the full schema: required
  `year`/`venue`/`title`/`authors`/`url`; optional `tags`, `featured`,
  `tagClass`, `bibtex`, `arxiv`, `repo`). The `bibtex:` literal block
  is the source for the Cite disclosure on `/publications/`; setting
  `featured: true` also surfaces the entry on `/research/` Selected Works.
- **A lab update** — prepend an entry to `data/news.yaml` (`date`,
  `title`, optional `url`/`display` — the file header documents the
  rules). The homepage shows the latest 4; `/about/#updates` shows all.
- **A leaderboard result** — append to `entries` in
  `data/leaderboard.yaml` (`rank`, `team`, `institution`, `score`).
- **A new founder** — add `content/team/<slug>.md` with frontmatter:
  `title`, `role`, `track` (clinical|technical), `weight`, `link`,
  `image` (optional theme asset path under `img/team/`), `initials`
  (fallback typographic mark), `bio`.
- **A workshop** — single page under `content/pages/<slug>.md` (or a
  section like `content/cvpr/_index.md`) with `layout: "workshop"`.
  Frontmatter:
  - `badge`, `subtitle` — header chip + tagline
  - `dates`, `enddates`, `location`, `event_image` — drive the `Event`
    JSON-LD in `meta.html` and the on-page chips
  - `external_url` — outbound "Workshop website" CTA
  - `gallery` (list of theme-asset paths under `img/workshops/`),
    `gallery_alt_prefix` — populates the lightbox gallery
  
  Then add a card to `layouts/workshops/list.html` and a label to
  the homepage hero ticker (`partials/ticker.html`).

## Content provenance

This site avoids unverified claims by policy. New copy that names a
person, partner, grant, paper, dataset, or model result must be
verifiable from the repo or explicitly approved before being added.
See git history of `redesign` for the Stage 0 content lock and
subsequent provenance audits.
