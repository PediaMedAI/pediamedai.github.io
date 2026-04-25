(function () {
  var STORAGE_KEY = "pediamedai-theme";
  var root = document.documentElement;
  var btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch (e) {}
    btn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
  }

  // Initialize aria-pressed from current state set by the head bootstrap.
  btn.setAttribute("aria-pressed", root.getAttribute("data-theme") === "dark" ? "true" : "false");

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
  });
})();
