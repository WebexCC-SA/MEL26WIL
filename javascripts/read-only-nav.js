/**
 * MkDocs Material strips inline styles from the integrated sidebar TOC.
 * Re-apply mkdocs.yml label format in nav: (<span style="color: red;"><strong>Read Only</strong></span>)
 */
(function () {
  var READ_ONLY_MARKUP =
    '(<span style="color: red;"><strong>Read Only</strong></span>)';
  var READ_ONLY_RE = /(\(Read Only\)|\[READ ONLY\]|\[Read Only\])/gi;

  function styleReadOnlyLabels(root) {
    var scope = root || document;
    scope.querySelectorAll(".md-nav__link .md-ellipsis").forEach(function (el) {
      if (el.querySelector('span[style*="color: red"]')) {
        return;
      }
      var text = el.textContent;
      if (!READ_ONLY_RE.test(text)) {
        return;
      }
      READ_ONLY_RE.lastIndex = 0;
      el.innerHTML = el.innerHTML.replace(READ_ONLY_RE, READ_ONLY_MARKUP);
    });
  }

  function init() {
    styleReadOnlyLabels(document);
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(init);
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
