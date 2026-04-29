(function () {
  var dialog = document.querySelector("[data-lightbox]");
  var gallery = document.querySelector("[data-gallery]");
  if (!dialog || !gallery) return;

  var img = dialog.querySelector("[data-lightbox-img]");
  var prev = dialog.querySelector("[data-lightbox-prev]");
  var next = dialog.querySelector("[data-lightbox-next]");
  var close = dialog.querySelector("[data-lightbox-close]");
  if (!img || !prev || !next || !close) return;

  // Snapshot the photo sources at load time. Each entry: {src, alt}.
  var items = Array.prototype.map.call(
    gallery.querySelectorAll("[data-gallery-open] img"),
    function (el) { return { src: el.src, alt: el.alt }; }
  );
  if (!items.length) return;

  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    img.src = items[index].src;
    img.alt = items[index].alt;
  }

  gallery.querySelectorAll("[data-gallery-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      show(parseInt(btn.getAttribute("data-gallery-open"), 10) || 0);
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  });

  function dismiss() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  close.addEventListener("click", dismiss);
  prev.addEventListener("click", function () { show(index - 1); });
  next.addEventListener("click", function () { show(index + 1); });

  // Backdrop click — only when the click is on the dialog itself, not on
  // its children. Native dialog backdrop registers as a click on the
  // dialog element.
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dismiss();
  });

  // Arrow keys to navigate while open.
  document.addEventListener("keydown", function (e) {
    if (!dialog.open) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
  });
})();
