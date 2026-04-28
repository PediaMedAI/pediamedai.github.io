(function () {
  document.querySelectorAll("[data-bib-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pre = btn.parentElement.querySelector("pre");
      var status = btn.parentElement.querySelector("[data-bib-status]");
      if (!pre) return;
      var text = pre.textContent.trim();

      var done = function () {
        var original = btn.textContent;
        btn.textContent = "Copied";
        btn.setAttribute("data-copied", "true");
        if (status) status.textContent = "BibTeX copied to clipboard";
        setTimeout(function () {
          btn.textContent = original;
          btn.removeAttribute("data-copied");
          if (status) status.textContent = "";
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
        return;
      }

      // Legacy fallback for browsers without async clipboard.
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(ta);
    });
  });
})();
