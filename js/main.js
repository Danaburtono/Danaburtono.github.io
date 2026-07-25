/* =====================================================================
   Dana Burton — Resume site
   Small vanilla-JS enhancements. No dependencies, no build step.
   ===================================================================== */

(function () {
  "use strict";

  /* ---------- Theme toggle (persists in localStorage) ---------- */
  const STORAGE_KEY = "resume-theme";
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.firstElementChild.textContent = theme === "dark" ? "☀️" : "🌙";
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  // Initial theme: saved choice → OS preference → light.
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ---------- Auto year in footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Resume download ----------
     If a real PDF exists at assets/resume.pdf, let the browser download it.
     Otherwise, fall back to the browser's "Save as PDF" print dialog, which
     uses the print stylesheet to produce a clean, downloadable resume. */
  const downloadBtn = document.getElementById("download-resume");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const pdfUrl = downloadBtn.getAttribute("href");
      fetch(pdfUrl, { method: "HEAD" })
        .then(function (res) {
          const type = res.headers.get("content-type") || "";
          if (res.ok && type.indexOf("pdf") !== -1) {
            // Real PDF is present — trigger a normal download.
            const a = document.createElement("a");
            a.href = pdfUrl;
            a.download = "Dana-Burton-Resume.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
          } else {
            window.print();
          }
        })
        .catch(function () {
          window.print();
        });
    });
  }

  /* ---------- Highlight active nav link on scroll ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav__links a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- Scroll-reveal animations ---------- */
  const revealTargets = document.querySelectorAll(
    ".section, .card, .timeline-item, .stat, .hero__content"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.target.matches(".stat")) {
              animateCount(entry.target.querySelector(".stat__num"));
            }
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    // No observer / reduced motion: show everything immediately.
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Animated count-up for stat numbers ---------- */
  function animateCount(el) {
    if (!el) return;
    const target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
