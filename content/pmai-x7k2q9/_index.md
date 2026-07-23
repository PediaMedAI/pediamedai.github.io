---
title: "Home"
# Unlinked, non-indexed mirror of what used to be the site root — see
# layouts/pmai-x7k2q9/list.html. cascade propagates `private: true` to
# every descendant page in this section (research, publications, team,
# code, workshops, jobs, cvpr, about, contact, code-of-conduct).
# IMPORTANT: this repo's sitemap.xml is a CUSTOM template
# (themes/pediamedai-frontier/layouts/sitemap.xml), not Hugo's default
# one — it excludes pages via `.Params.private`, not the standard
# `sitemap: disable` front-matter key. Using the wrong key here would
# silently fail to exclude anything. Combined with noindex meta
# (partials/head.html) and robots.txt's Disallow — unlinked from the
# real homepage and from search engines, not a real access boundary
# (this repo is public).
private: true
cascade:
  private: true
---
