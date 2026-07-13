<?xml version="1.0" encoding="utf-8"?>
<!-- Renders /index.xml as a readable page when opened in a browser
     (referenced by the xml-stylesheet PI in layouts/_default/rss.xml).
     Palette mirrors the site tokens; self-contained by design — no
     external assets, theme-aware via prefers-color-scheme. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="utf-8" indent="yes"/>
  <xsl:template match="/rss/channel">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="title"/> — RSS feed</title>
        <style>
          :root { color-scheme: light dark; }
          body { margin: 0 auto; max-width: 720px; padding: 48px 24px;
                 font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                 color: #2a2b2c; background: #f6f5f1; }
          a { color: #1d4ed8; }
          h1 { font-size: 28px; letter-spacing: -0.02em; margin: 0 0 8px; }
          .banner { font-size: 13px; padding: 10px 14px; border: 1px solid currentColor;
                    border-radius: 4px; opacity: 0.75; margin-bottom: 32px; }
          .item { padding: 18px 0; border-bottom: 1px solid #d9d6cc; }
          .item h2 { font-size: 18px; margin: 0 0 6px; }
          .date { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase;
                  opacity: 0.7; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
          p { margin: 6px 0 0; }
          @media (prefers-color-scheme: dark) {
            body { color: #d9d6cc; background: #0c0d0e; }
            a { color: #6f9bff; }
            .item { border-color: #25272a; }
          }
        </style>
      </head>
      <body>
        <div class="banner">This is the site's RSS feed. Copy the URL into your feed reader to subscribe.</div>
        <h1><xsl:value-of select="title"/></h1>
        <p><xsl:value-of select="description"/></p>
        <xsl:for-each select="item">
          <div class="item">
            <div class="date"><xsl:value-of select="pubDate"/></div>
            <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
            <p><xsl:value-of select="description"/></p>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
