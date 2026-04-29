(function () {
  // Skip on slow / metered connections.
  var ci = navigator.connection;
  if (ci && (ci.saveData || /2g/i.test(ci.effectiveType || ""))) return;

  var prefetched = new Set();
  var origin = location.origin;

  function prefetch(href) {
    if (!href || prefetched.has(href)) return;
    prefetched.add(href);
    var link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    link.as = "document";
    document.head.appendChild(link);
  }

  // Skip prefetch for non-HTML resources (PDFs, archives, images, etc.).
  // Hugo routes are either trailing-slash dirs or unsuffixed paths;
  // anything with a recognized binary extension would prefetch as
  // as="document" which can mis-cache or fail.
  var SKIP_EXT = /\.(pdf|zip|tar|gz|7z|jpg|jpeg|png|webp|gif|svg|mp4|webm|mov|woff2?|ttf|otf|js|css|xml|rss|json|txt|csv|epub|md)$/i;

  function maybe(e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (e) { return; }
    if (url.origin !== origin) return;
    if (url.pathname === location.pathname) return;
    if (SKIP_EXT.test(url.pathname)) return;
    prefetch(url.pathname + url.search);
  }

  // Hover for mice + focus for keyboard. The `passive` listener is
  // negligible cost; ignored events drop through quickly.
  document.addEventListener("mouseover", maybe, { passive: true });
  document.addEventListener("focusin", maybe);
})();
