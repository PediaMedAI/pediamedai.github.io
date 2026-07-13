(function () {
  var btns = document.querySelectorAll("[data-pub-filter]");
  var pubs = document.querySelectorAll(".pub[data-pub-tags]");
  if (!btns.length || !pubs.length) return;

  var STORAGE_KEY = "pediamedai-pub-filter";
  var countEl = document.querySelector("[data-pub-count]");
  var total = pubs.length;
  var current = null;

  function apply(filter) {
    if (filter === current) return;
    current = filter;
    btns.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-pub-filter") === filter ? "true" : "false");
    });
    // hidden attribute (backed by a .pub[hidden] rule in _pub.scss)
    // instead of inline display — keeps visibility queryable and the
    // styling concern in CSS.
    var shown = 0;
    pubs.forEach(function (p) {
      var tags = (p.getAttribute("data-pub-tags") || "").split(" ");
      var match = filter === "all" || tags.indexOf(filter) >= 0;
      if (match) {
        p.removeAttribute("hidden");
        shown += 1;
      } else {
        p.setAttribute("hidden", "");
      }
    });
    // The count line is a visible summary AND the screen-reader
    // announcement (role=status in the template) — without it, AT
    // users get no feedback that rows just disappeared.
    if (countEl) {
      countEl.textContent = filter === "all"
        ? total + " publications"
        : shown + " of " + total + " publications";
    }
  }

  // Restore last filter (if it still maps to a button) on page load.
  var stored;
  try { stored = sessionStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (stored && document.querySelector('[data-pub-filter="' + stored + '"]')) {
    apply(stored);
  }

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-pub-filter");
      apply(filter);
      try { sessionStorage.setItem(STORAGE_KEY, filter); } catch (e) {}
    });
  });
})();
