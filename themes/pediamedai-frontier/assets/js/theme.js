(function () {
  var STORAGE_KEY = "pediamedai-theme";
  var root = document.documentElement;

  // Keep the mobile browser-chrome color matched to the *applied*
  // theme. head.html ships two media-scoped <meta name="theme-color">
  // tags, but those only follow the OS preference — a visitor whose
  // stored choice overrides the OS (dark theme on a light-mode device,
  // or vice versa) would otherwise get mismatched chrome. This appends
  // one non-media meta last, so it always wins over the media pair,
  // and reads the live --bg token so it can't drift from the palette.
  function syncThemeColor() {
    var bg = getComputedStyle(root).getPropertyValue("--bg").trim();
    if (!bg) return;
    var m = document.querySelector('meta[name="theme-color"][data-dynamic]');
    if (!m) {
      m = document.createElement("meta");
      m.name = "theme-color";
      m.setAttribute("data-dynamic", "");
      document.head.appendChild(m);
    }
    m.content = bg;
  }
  syncThemeColor();

  var btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch (e) {}
    btn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
    syncThemeColor();
  }

  // Initialize aria-pressed from current state set by the head bootstrap.
  btn.setAttribute("aria-pressed", root.getAttribute("data-theme") === "dark" ? "true" : "false");

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
  });
})();
