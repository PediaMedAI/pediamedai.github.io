(function () {
  var btns = document.querySelectorAll("[data-pub-filter]");
  var pubs = document.querySelectorAll(".pub[data-pub-tags]");
  if (!btns.length || !pubs.length) return;

  var STORAGE_KEY = "pediamedai-pub-filter";
  var current = null;

  function apply(filter) {
    if (filter === current) return;
    current = filter;
    btns.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-pub-filter") === filter ? "true" : "false");
    });
    pubs.forEach(function (p) {
      var tags = (p.getAttribute("data-pub-tags") || "").split(" ");
      p.style.display = (filter === "all" || tags.indexOf(filter) >= 0) ? "" : "none";
    });
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
