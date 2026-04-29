(function () {
  document.querySelectorAll("[data-bib-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pre = btn.parentElement.querySelector("pre");
      var status = btn.parentElement.querySelector("[data-bib-status]");
      if (!pre) return;
      var text = pre.textContent.trim();
      // Trim so whitespace from indented source markup doesn't
      // get round-tripped into the post-reset label.
      var original = btn.textContent.trim();

      var resetAfter = function () {
        setTimeout(function () {
          btn.textContent = original;
          btn.removeAttribute("data-copied");
          btn.removeAttribute("data-copy-error");
          if (status) status.textContent = "";
        }, 1600);
      };

      var success = function () {
        btn.textContent = "Copied";
        btn.setAttribute("data-copied", "true");
        if (status) status.textContent = "BibTeX copied to clipboard";
        resetAfter();
      };

      var failure = function () {
        btn.textContent = "Copy failed";
        btn.setAttribute("data-copy-error", "true");
        if (status) status.textContent = "Copy failed — select the BibTeX manually";
        resetAfter();
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(success, failure);
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
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      ok ? success() : failure();
    });
  });
})();
