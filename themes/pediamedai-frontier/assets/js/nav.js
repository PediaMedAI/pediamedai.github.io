(function () {
  var nav = document.querySelector("[data-nav]");
  var btn = document.querySelector("[data-nav-toggle]");
  var menu = nav && nav.querySelector(".links");
  if (!nav || !btn || !menu) return;

  // Shared breakpoint — sourced from --bp-tablet which _tokens.scss
  // mirrors from the Sass $bp-tablet variable used by @media queries.
  // Falls back to 980 if the custom property isn't readable.
  var bpTablet = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--bp-tablet"), 10) || 980;
  var mq = window.matchMedia("(min-width: " + (bpTablet + 1) + "px)");

  // Regions to inert while the drawer is open, marked by baseof.html
  // and the footer partial via [data-nav-inert]. Cached at init since
  // these elements are static.
  var trap = document.querySelectorAll("[data-nav-inert]");

  function setOpen(open) {
    nav.setAttribute("data-nav-open", open ? "true" : "false");
    document.body.setAttribute("data-nav-open", open ? "true" : "false");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    syncInert();
  }

  // Drawer state only matters at mobile widths; on desktop the menu is
  // always reachable so we never want it inert, and the page regions
  // behind it stay tabbable.
  function syncInert() {
    var mobile = !mq.matches;
    var open = nav.getAttribute("data-nav-open") === "true";
    if (mobile && !open) menu.setAttribute("inert", "");
    else menu.removeAttribute("inert");
    trap.forEach(function (el) {
      if (mobile && open) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  }

  syncInert();

  btn.addEventListener("click", function () {
    setOpen(nav.getAttribute("data-nav-open") !== "true");
  });

  // Delegate so links injected after first paint also close the drawer.
  nav.addEventListener("click", function (e) {
    if (e.target.closest(".links a")) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.getAttribute("data-nav-open") === "true") {
      setOpen(false);
      btn.focus();
    }
  });

  mq.addEventListener("change", function () {
    if (mq.matches) setOpen(false);
    else syncInert();
  });
})();
