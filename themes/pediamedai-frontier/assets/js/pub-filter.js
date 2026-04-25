(function () {
  var btns = document.querySelectorAll("[data-pub-filter]");
  var pubs = document.querySelectorAll(".pub[data-pub-tags]");
  if (!btns.length || !pubs.length) return;

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-pub-filter");
      btns.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      pubs.forEach(function (p) {
        var tags = (p.getAttribute("data-pub-tags") || "").split(" ");
        p.style.display = (f === "all" || tags.indexOf(f) >= 0) ? "" : "none";
      });
    });
  });
})();
