/**
 * MOTION & INTERACTION ENGINE
 * Powered by Lenis, GSAP, and ScrollTrigger
 * Tactile micro-interactions, magnetic buttons, and custom cursor
 */

export function initMotion() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Initialize Custom Magnetic Cursor (Desktop only)
  initCustomCursor(prefersReducedMotion);

  // Initialize Lenis Smooth Scroll
  let lenis = null;
  if (!prefersReducedMotion && typeof window.Lenis !== "undefined") {
    lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger if available
    if (typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined") {
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    }
  }

  // Initialize Magnetic Buttons
  if (!prefersReducedMotion) {
    initMagneticButtons();
  }

  // Initialize GSAP ScrollTrigger Reveals
  initScrollAnimations(prefersReducedMotion);

  // Initialize Timeline Progress Bar Scroll Tracker
  initTimelineProgress();

  return lenis;
}

/**
 * Custom Cursor Follower
 */
function initCustomCursor(reducedMotion) {
  if (reducedMotion || window.innerWidth < 992) return;

  const cursor = document.querySelector(".custom-cursor");
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (!cursor || !dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    },
    { passive: true }
  );

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover triggers
  const hoverables = document.querySelectorAll("a, button, .skill-card, .info-block-card, .project-feature-card");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

/**
 * Magnetic Buttons (Apple tactile feel)
 */
function initMagneticButtons() {
  const magneticEls = document.querySelectorAll(".btn, .theme-toggle-btn, .footer-social-btn");

  magneticEls.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });
}

/**
 * GSAP ScrollTrigger Animations
 */
function initScrollAnimations(reducedMotion) {
  if (typeof window.gsap === "undefined") return;

  const gsap = window.gsap;
  if (typeof window.ScrollTrigger !== "undefined") {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  if (reducedMotion) {
    // Show everything immediately without motion
    gsap.set(
      ".hero-content, .about-portrait-card, .about-narrative, .skill-card, .project-feature-card, .timeline-card, .contact-card-wrapper",
      { opacity: 1, y: 0 }
    );
    return;
  }

  // Hero Entrance Timeline
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
  heroTl
    .from(".hero-status-wrapper", { opacity: 0, y: 20, delay: 0.2 })
    .from(".hero-headline", { opacity: 0, y: 35, duration: 1 }, "-=0.6")
    .from(".hero-subtitle", { opacity: 0, y: 20 }, "-=0.7")
    .from(".hero-badges-row", { opacity: 0, y: 15 }, "-=0.6")
    .from(".hero-bio-snippet", { opacity: 0, y: 20 }, "-=0.6")
    .from(".hero-cta-group", { opacity: 0, y: 20 }, "-=0.6")
    .from(".hero-scroll-prompt", { opacity: 0, y: 10 }, "-=0.4");

  // About Section Reveals
  if (typeof window.ScrollTrigger !== "undefined") {
    gsap.from(".about-portrait-card", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
      },
      opacity: 0,
      x: -40,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".about-narrative", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
      },
      opacity: 0,
      x: 40,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".info-block-card", {
      scrollTrigger: {
        trigger: ".about-blocks-grid",
        start: "top 85%",
      },
      opacity: 0,
      y: 25,
      stagger: 0.12,
      duration: 0.8,
      ease: "power2.out",
    });

    // Skills Section Reveal
    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.06,
      duration: 0.7,
      ease: "power2.out",
    });

    // Project Featured Showcase
    gsap.from(".project-feature-card", {
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 75%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    // Contact Card Reveal
    gsap.from(".contact-card-wrapper", {
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });
  }
}

/**
 * Timeline Progress Line Scroll Tracker
 */
function initTimelineProgress() {
  const timelineSection = document.querySelector(".timeline-section");
  const progressLine = document.querySelector(".timeline-progress-line");
  const trackLine = document.querySelector(".timeline-track-line");

  if (!timelineSection || !progressLine || !trackLine) return;

  window.addEventListener(
    "scroll",
    () => {
      const rect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Start filling when timeline enters viewport
      const start = windowHeight * 0.7;
      const progress = Math.min(Math.max((start - rect.top) / sectionHeight, 0), 1);

      progressLine.style.height = `${progress * 100}%`;
    },
    { passive: true }
  );
}
