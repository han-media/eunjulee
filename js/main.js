// ============================================================
// Shared site behavior: mobile nav, scroll fade-ins, and the
// story-list renderer used by My Art.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initRelatedMenu();
  initFadeIns();
});

function initMobileNav() {
  var toggle = document.querySelector(".site-nav__menu-toggle");
  var menu = document.querySelector(".site-nav__menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// The "Related" nav item isn't a link — it's a label that reveals a
// panel of related links. Desktop shows the panel on hover (handled
// in CSS); this click handler is what makes it work by tap on mobile,
// where hover doesn't apply.
function initRelatedMenu() {
  var related = document.querySelector(".site-nav__related");
  var toggle = document.querySelector(".site-nav__related-toggle");
  if (!related || !toggle) return;

  toggle.addEventListener("click", function () {
    var isOpen = related.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function initFadeIns() {
  var targets = document.querySelectorAll(".fade-in:not([data-observed])");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach(function (el) {
    el.setAttribute("data-observed", "true");
    observer.observe(el);
  });
}

// ------------------------------------------------------------
// Story list renderer
//
// Renders an array of entries into alternating left/right rows and
// builds a left-hand "jump to" guide from the titles.
//
// Photo entries (wildlife-data.js) take an "images" list — 2–3
// photos cross-fade into each other every few seconds, staggered
// so multiple stories don't change in sync.
//
// Video entries (video-data.js) take a single "video" file and
// render with a minimal custom player — a poster image, a play
// button, and a mute toggle, deliberately with no native scrub bar.
// Nothing autoplays; a visitor presses play, and the frame sizes
// itself to that file's own aspect ratio instead of a fixed crop.
// Pausing mid-watch just brings the play button back at that frame;
// letting a video play to the end resets it fully — poster showing,
// play button back, no trace it was ever watched.
//
// Clicking a guide link scrolls straight to that story and briefly
// darkens it so it's easy to spot when it lands. The guide also
// highlights whichever story is currently in view as you scroll
// (including snapping to the last one once you hit the bottom of
// the page). On mobile the guide collapses into a floating button
// in the corner; tapping it opens the list of titles.
//
// options:
//   guideLabel — heading text above the jump-to list
// ------------------------------------------------------------

function renderStoryList(listId, guideId, entries, options) {
  options = options || {};
  var list = document.getElementById(listId);
  var guide = document.getElementById(guideId);
  if (!list || !entries || !entries.length) return;

  var usedSlugs = {};

  entries.forEach(function (entry, index) {
    var slug = slugify(entry.title, usedSlugs);

    var row = document.createElement("article");
    row.className =
      "story-row" + (index % 2 === 1 ? " story-row--reverse" : "");
    row.id = slug;

    var figureClasses = "story-row__figure fade-in";
    var images = entry.images && entry.images.length ? entry.images : [entry.image];
    var mediaHtml = images
      .map(function (src, i) {
        return (
          '<img src="' +
          src +
          '" alt="' +
          escapeHtml(entry.alt || entry.title || "") +
          '" loading="lazy" class="' +
          (i === 0 ? "is-active" : "") +
          '">'
        );
      })
      .join("");

    row.innerHTML =
      '<div class="' + figureClasses + '">' + mediaHtml + "</div>" +
      '<div class="story-row__text fade-in">' +
      (entry.meta
        ? '<span class="story-row__meta">' + escapeHtml(entry.meta) + "</span>"
        : "") +
      "<h2>" +
      escapeHtml(entry.title || "") +
      "</h2>" +
      "<p>" +
      escapeHtml(entry.text || "") +
      "</p>" +
      "</div>";

    list.appendChild(row);

    // Cross-fade between photos every 4 seconds when there's more than one
    var imageCount = (entry.images && entry.images.length) || (entry.image ? 1 : 0);
    if (imageCount > 1) {
      startCrossfade(row.querySelector(".story-row__figure"));
    }
  });

  if (guide) {
    var links = Array.prototype.map.call(list.children, function (row) {
      var heading = row.querySelector("h2");
      var title = heading ? heading.textContent : "";
      return (
        '<li><a href="#' +
        row.id +
        '" data-target="' +
        row.id +
        '">' +
        escapeHtml(title) +
        "</a></li>"
      );
    });

    guide.innerHTML =
      '<button type="button" class="story-guide__toggle" aria-expanded="false" aria-label="Jump to a section">' +
      '<span class="story-guide__toggle-icon"></span>' +
      "</button>" +
      '<div class="story-guide__panel">' +
      '<p class="story-guide__eyebrow">' + (options.guideLabel || "Jump to") + "</p>" +
      '<ul class="story-guide__list">' +
      links.join("") +
      "</ul>" +
      "</div>";

    initGuideJump(guide);
  }

  initFadeIns();
  initGuideHighlight(list, guide);
}

// Clicking a guide link scrolls to its story and briefly darkens
// that story so it's easy to spot when it lands — always the story
// you actually clicked, regardless of whether the jump moved up or
// down the page. On mobile, the guide is a floating button; tapping
// it opens the panel, and tapping a link closes it again.
function initGuideJump(guide) {
  var toggle = guide.querySelector(".story-guide__toggle");
  var links = guide.querySelectorAll(".story-guide__list a");
  if (!links.length) return;

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = guide.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("data-target");
      var targetRow = document.getElementById(targetId);
      if (!targetRow) return;

      e.preventDefault();
      targetRow.scrollIntoView({ behavior: "smooth", block: "start" });

      targetRow.classList.add("is-darkened");
      setTimeout(function () {
        targetRow.classList.remove("is-darkened");
      }, 900);

      guide.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function startCrossfade(figure) {
  var slides = figure.querySelectorAll("img");
  if (slides.length < 2) return;
  var current = 0;
  var intervalMs = 4000;
  // Stagger the start so multiple stories on the page don't all
  // change photos at the same moment.
  var initialDelay = Math.random() * intervalMs;

  setTimeout(function () {
    setInterval(function () {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, intervalMs);
  }, initialDelay);
}

// Highlights whichever story's top has most recently passed a
// reference line near the top of the page, recalculated on every
// scroll tick — this is a plain position check rather than an
// enter/exit event, so it's not biased by scroll direction the way
// IntersectionObserver-based highlighting can be.
function initGuideHighlight(list, guide) {
  if (!guide) return;
  var links = guide.querySelectorAll(".story-guide__list a");
  if (!links.length) return;

  var linkByTarget = {};
  links.forEach(function (link) {
    linkByTarget[link.getAttribute("data-target")] = link;
  });

  var rows = Array.prototype.filter.call(list.children, function (row) {
    return linkByTarget[row.id];
  });
  if (!rows.length) return;

  var navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 84;
  var ticking = false;

  function update() {
    var referenceY = window.scrollY + navHeight + 40;
    var current = rows[0];

    for (var i = 0; i < rows.length; i++) {
      var top = rows[i].getBoundingClientRect().top + window.scrollY;
      if (top <= referenceY) {
        current = rows[i];
      } else {
        break;
      }
    }

    // At the very bottom of the page there may not be enough room
    // below the last row for the reference line to ever reach it —
    // so once you've scrolled all the way down, it's always the
    // final section, regardless of where the line falls.
    var atBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;
    if (atBottom) {
      current = rows[rows.length - 1];
    }

    var activeLink = linkByTarget[current.id];
    links.forEach(function (l) {
      l.classList.toggle("is-active", l === activeLink);
    });
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

function slugify(text, usedSlugs) {
  var base = (text || "story")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  if (!base) base = "story";
  var slug = base;
  var n = 2;
  while (usedSlugs[slug]) {
    slug = base + "-" + n;
    n++;
  }
  usedSlugs[slug] = true;
  return slug;
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
