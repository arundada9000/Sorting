/* EasySorting HIG runtime: theme, nav, reveal animations, SVG charts, 404 jokes. */

(function () {
  "use strict";

  var root = document.documentElement;
  var savedTheme = null;
  try { savedTheme = localStorage.getItem("es-theme"); } catch (e) { savedTheme = null; }
  var systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = savedTheme || (systemDark ? "dark" : "light");
  root.dataset.theme = theme;

  var themeToggle = document.getElementById("themeToggle");
  function applyThemeIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === "dark"
      ? '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>'
      : '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>';
  }
  applyThemeIcon();

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      root.dataset.theme = theme;
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      try { localStorage.setItem("es-theme", theme); } catch (e) {}
      applyThemeIcon();
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", theme === "dark" ? "#000000" : "#F2F2F7");
      document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: theme } }));
    });
  }

  /* ---- Mobile nav ---- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("nav-show");
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (ev) {
      if (ev.target.closest("a")) {
        navLinks.classList.remove("nav-show");
        document.body.classList.remove("nav-open");
      }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && navLinks.classList.contains("nav-show")) {
        navLinks.classList.remove("nav-show");
        document.body.classList.remove("nav-open");
      }
    });
  }

  /* ---- Reveal on scroll with stagger ---- */
  function setupReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) {
      var idx = el.hasAttribute("data-reveal-delay")
        ? parseInt(el.getAttribute("data-reveal-delay"), 10) || 0
        : 0;
      el.style.setProperty("--reveal-delay", idx + "ms");
      io.observe(el);
    });
  }

  /* ---- Copy to clipboard buttons ---- */
  function setupCopy() {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy");
        var done = function () {
          var old = btn.textContent;
          btn.textContent = btn.getAttribute("data-copied-label") || "Copied";
          setTimeout(function () { btn.textContent = old; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done);
        } else {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(ta);
          done();
        }
      });
    });
  }

  /* ============================================================
     Charts: growth curves (SVG polyline) and horizontal bars
     ============================================================ */
  function el(name, attrs, parent) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function cssVar(name) {
    var v = getComputedStyle(root).getPropertyValue(name).trim();
    return v || "";
  }

  /* Growth curve chart. series: [{label, color, fn}]. fn: n -> number. */
  function drawGrowthCurve(svg, series, opts) {
    opts = opts || {};
    var width = opts.width || 760;
    var height = opts.height || 360;
    var padL = opts.padL || 46, padR = opts.padR || 16, padT = opts.padT || 20, padB = opts.padB || 34;
    var nMax = opts.nMax || 100;
    var nMin = Math.min(nMax, opts.nMin || 1);
    var steps = opts.steps || 120;

    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    var ns = "http://www.w3.org/2000/svg";
    var g = document.createElementNS(ns, "g");
    svg.appendChild(g);

    var labelColor = cssVar("--label-3") || "#999";
    var gridColor = cssVar("--sep") || "#ddd";
    var label2 = cssVar("--label-2") || "#666";

    function fnMax(fns) {
      var m = 0;
      for (var n = nMin; n <= nMax; n += (nMax - nMin) / steps) {
        fns.forEach(function (f) { var v = f(n); if (isFinite(v) && v > m) m = v; });
      }
      return m || 1;
    }

    function scanCoverage(fn, maxVal) {
      var covered = 0;
      for (var n = nMix(0.5); n <= nMax; n += (nMax - nMix(0.5)) / steps) {
        var v = fn(n);
        if (isFinite(v) && v <= maxVal) covered++;
      }
      return covered / ((steps * 0.5) || 1);
    }
    function nMix(t) { return nMin + (nMax - nMin) * t; }
    function scanCount(fn, maxVal) {
      var c = 0, tot = 0;
      for (var t = 0; t <= 1.001; t += 1 / steps) {
        var v = fn(nMix(t));
        tot++;
        if (isFinite(v) && v <= maxVal) c++;
      }
      return c / tot;
    }

    var maxRef = fnMax(series.map(function (s) { return s.fn; }));

    function X(n) { return padL + ((n - nMin) / (nMax - nMin)) * (width - padL - padR); }
    function Y(v) {
      var y = padT + (1 - Math.log(1 + v) / Math.log(1 + maxRef)) * (height - padT - padB);
      return Math.max(padT, Math.min(height - padB, y));
    }

    /* gridlines: x at quarters of n, y at thirds */
    for (var gx = 0; gx <= 4; gx++) {
      var nx = nMix(gx / 4);
      var xx = X(nx);
      el("line", { x1: xx, y1: padT, x2: xx, y2: height - padB, class: "grid-line", stroke: gridColor, "stroke-dasharray": gx === 0 || gx === 4 ? "0" : "3 4", opacity: gx === 0 || gx === 4 ? 0.55 : 0.4 }, g);
      el("text", { x: xx, y: height - 12, class: "axis-label", fill: labelColor, "text-anchor": gx === 0 ? "start" : gx === 4 ? "end" : "middle" }, g).textContent = gx === 4 ? "n = " + nMax : "";
    }
    for (var gy = 0; gy <= 3; gy++) {
      var vy = gy / 3;
      var yy = padT + vy * (height - padT - padB);
      el("line", { x1: padL, y1: yy, x2: width - padR, y2: yy, class: "grid-line", stroke: gridColor, "stroke-dasharray": "3 4", opacity: 0.3 }, g);
    }
    el("text", { x: padL, y: padT - 8, class: "axis-label", fill: labelColor }, g).textContent = "operations (log scale)";
    el("text", { x: width - padR, y: height - 12, class: "axis-label", fill: labelColor, "text-anchor": "end" }, g);

    /* coverage based on whether 2^n fits; if not, it is clamped. */
    function buildPath(fn) {
      var d = "", first = true;
      for (var t = 0; t <= 1.001; t += 1 / steps) {
        var nn = nMix(t);
        var v = fn(nn);
        if (!isFinite(v) || v <= 0) { first = true; continue; }
        var xx = X(nn), yy = Y(v);
        d += (first ? "M" : "L") + xx.toFixed(1) + " " + yy.toFixed(1);
        first = false;
      }
      return d;
    }

    /* cap the plot so O(2^n) never skews everyone else */
    var cap = maxRef;
    series.forEach(function (s) {
      if (scanCount(s.fn, cap) < 0.35) {
        /* this series blows past the top early, give it a dedicated cap */
        var local = 0;
        for (var t = 0; t <= 1; t += 0.02) {
          var v = s.fn(nMix(t));
          if (isFinite(v) && v > local) local = v;
        }
        /* no-op: keep global scale, curve simply exits the top of the chart */
      }
    });

    series.forEach(function (s) {
      var path = el("path", {
        d: buildPath(s.fn),
        class: "curve-path",
        fill: "none",
        stroke: s.color
      }, g);
      var len = 900;
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          path.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.32, 0.72, 0, 1) " + (series.indexOf(s) * 0.12) + "s";
          path.style.strokeDashoffset = "0";
        });
      });
    });

    /* last-point dots + labels are drawn by caller via legend */
  }

  /* Horizontal bar chart. items: [{label, sub, value, color}] */
  function drawBars(container, items, opts) {
    opts = opts || {};
    container.innerHTML = "";
    var max = opts.max || 1;
    items.forEach(function (it, i) {
      var row = document.createElement("div");
      row.className = "bar-row";
      row.style.setProperty("--reveal-delay", (i * 55) + "ms");
      var lab = document.createElement("div");
      lab.className = "bar-row__label";
      lab.textContent = it.label;
      if (it.sub) {
        var s = document.createElement("small");
        s.textContent = it.sub;
        lab.appendChild(s);
      }
      var track = document.createElement("div");
      track.className = "bar-row__track";
      var fill = document.createElement("div");
      fill.className = "bar-row__fill";
      fill.style.background = it.color || undefined;
      track.appendChild(fill);
      var val = document.createElement("div");
      val.className = "bar-row__value";
      val.textContent = opts.format ? opts.format(it.value) : String(it.value);
      row.appendChild(lab); row.appendChild(track); row.appendChild(val);
      container.appendChild(row);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          fill.style.width = Math.max(0.5, (it.value / max) * 100) + "%";
        });
      });
    });
  }

  /* Racer tracks for the race page */
  function drawRacers(container, items) {
    container.innerHTML = "";
    items.forEach(function (it, i) {
      var row = document.createElement("div");
      row.className = "track-row";
      var name = document.createElement("div");
      name.className = "track-row__name";
      name.textContent = it.name;
      var rail = document.createElement("div");
      rail.className = "track-row__rail";
      var racer = document.createElement("div");
      racer.className = "track-row__racer";
      racer.style.background = it.color || "#007AFF";
      rail.appendChild(racer);
      row.appendChild(name); row.appendChild(rail);
      container.appendChild(row);
      var target = it.progress || 0;
      var delay = 250 + i * 320 + Math.random() * 220;
      setTimeout(function () {
        racer.style.transition = "width " + (300 + Math.max(200, (it.ms * 14))) + "ms cubic-bezier(0.32, 0.72, 0, 1)";
        racer.style.width = target + "%";
      }, delay);
    });
  }

  /* ---- 404 rotating joke ---- */
  var jokes = [
    "This page fell out of the heap.",
    "404. Even bubble sort could not put this page back.",
    "This page sorted itself right out of existence.",
    "Page not found. Try insertion sort instead of browsing.",
    "O(404). This page is asymptotically missing.",
    "Someone forgot to merge this page back where it belongs.",
    "This URL has been deallocated. Segfault of curiosity.",
    "We ran bucket sort and this page landed in the wrong bucket."
  ];
  function fire404Joke() {
    var slot = document.getElementById("joke-line");
    if (!slot) return;
    var lines = jokes.slice();
    slot.textContent = lines[Math.floor(Math.random() * lines.length)];
  }

  /* ---- footer year ---- */
  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (n) {
      n.textContent = new Date().getFullYear();
    });
  }

  function init() {
    setupReveal();
    setupCopy();
    fire404Joke();
    setYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.FastSort = window.FastSort || {};
  window.FastSort.hig = {
    drawGrowthCurve: drawGrowthCurve,
    drawBars: drawBars,
    drawRacers: drawRacers,
    el: el,
    cssVar: cssVar,
    themeIs: function () { return theme; }
  };
})();