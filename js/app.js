/**
 * MAIN APPLICATION LOGIC
 * Handles dynamic data rendering, theme toggle, mobile navigation,
 * project detail modal, skills category filtering, and contact form handling.
 */

import { portfolioData } from "./data.js";
import { initHeroCanvas } from "./canvas.js";
import { initMotion } from "./motion.js";

document.addEventListener("DOMContentLoaded", () => {
  // Render content from centralized data
  renderPortfolioContent();

  // Initialize UI features
  initThemeToggle();
  initNavigation();
  initSkillsFilter();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initBackToTop();

  // Initialize WebGL Hero Canvas
  initHeroCanvas();

  // Initialize Motion Engine
  initMotion();

  // Initialize Lucide icons
  if (typeof window.lucide !== "undefined") {
    window.lucide.createIcons();
  }
});

/**
 * Render all content dynamically from portfolioData
 */
function renderPortfolioContent() {
  const { profile, about, skills, projects, timeline, achievements, socialLinks, footer } = portfolioData;

  // 1. Brand & Header
  const brandName = document.querySelector(".brand-title");
  if (brandName) brandName.textContent = profile.name;

  // 2. Hero Section
  const heroStatus = document.querySelector(".hero-status-text");
  if (heroStatus) heroStatus.textContent = profile.statusBadge;

  const heroHeadline = document.querySelector(".hero-headline-name");
  if (heroHeadline) heroHeadline.textContent = profile.name;

  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) heroSubtitle.textContent = profile.subtitle;

  const heroBio = document.querySelector(".hero-bio-snippet");
  if (heroBio) heroBio.textContent = profile.intro;

  // 3. About Section
  const aboutHeading = document.querySelector(".about-heading");
  if (aboutHeading) aboutHeading.textContent = about.heading;

  const aboutLead = document.querySelector(".about-lead-text");
  if (aboutLead) aboutLead.innerHTML = about.leadParagraph;

  const aboutSecondary = document.querySelector(".about-secondary-text");
  if (aboutSecondary) aboutSecondary.textContent = about.secondaryParagraph;

  // About Info Blocks
  const blocksContainer = document.querySelector(".about-blocks-grid");
  if (blocksContainer) {
    blocksContainer.innerHTML = about.infoBlocks
      .map(
        (b) => `
      <div class="info-block-card">
        <div class="info-block-header">
          <i data-lucide="${b.icon}"></i>
          <span class="info-block-title">${b.title}</span>
        </div>
        <div class="info-block-content">${b.content}</div>
        <div class="info-block-subtext">${b.subtext}</div>
      </div>
    `
      )
      .join("");
  }

  // 4. Skills Section
  const categoryBar = document.querySelector(".skills-category-bar");
  if (categoryBar) {
    categoryBar.innerHTML = skills.categories
      .map(
        (cat, idx) => `
      <button class="category-tab-btn ${idx === 0 ? "active" : ""}" data-category="${cat.id}">
        ${cat.label}
      </button>
    `
      )
      .join("");
  }

  renderSkillsGrid("all");

  // 5. Projects Section
  const projectsContainer = document.querySelector(".projects-showcase-container");
  if (projectsContainer) {
    const featured = projects.find((p) => p.featured) || projects[0];
    const secondary = projects.filter((p) => p.id !== featured.id);

    projectsContainer.innerHTML = `
      <!-- Featured Project Card -->
      <article class="project-feature-card" data-project-id="${featured.id}">
        <div class="project-image-wrapper">
          <img src="${featured.image}" alt="${featured.title}" class="project-image" loading="lazy" />
        </div>
        <div class="project-info-wrapper">
          <div>
            <div class="project-number-badge">PROJECT ${featured.number}</div>
            <h3 class="project-title">${featured.title}</h3>
            <p class="project-summary">${featured.description}</p>
            <div class="project-tech-tags">
              ${featured.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
            </div>
          </div>
          <div class="project-action-buttons">
            <button class="btn btn-primary open-modal-btn" data-project-id="${featured.id}">
              <span>View Project Details</span>
              <span class="btn-icon-right"><i data-lucide="arrow-up-right"></i></span>
            </button>
            <a href="${featured.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <i data-lucide="github"></i>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </article>

      <!-- Secondary / In Development Projects Grid -->
      <div class="projects-secondary-grid">
        ${secondary
          .map(
            (p) => `
          <div class="project-compact-card" data-project-id="${p.id}">
            <div>
              <div class="project-compact-status">
                <i data-lucide="sparkles"></i>
                <span>${p.tagline}</span>
              </div>
              <h4 class="project-title" style="font-size: 1.35rem;">${p.title}</h4>
              <p class="project-summary" style="font-size: 0.9rem; margin-bottom: 1.5rem;">${p.description}</p>
              <div class="project-tech-tags" style="margin-bottom: 1.5rem;">
                ${p.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
              </div>
            </div>
            <div class="project-action-buttons">
              <button class="btn btn-secondary btn-sm open-modal-btn" data-project-id="${p.id}">
                <span>Quick View</span>
                <i data-lucide="maximize-2"></i>
              </button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  // 6. Timeline Section
  const timelineItemsContainer = document.querySelector(".timeline-items-wrapper");
  if (timelineItemsContainer) {
    timelineItemsContainer.innerHTML = timeline
      .map(
        (entry) => `
      <div class="timeline-item">
        <div class="timeline-node-marker">
          <div class="timeline-node-inner"></div>
        </div>
        <div class="timeline-card">
          <span class="timeline-period-badge">${entry.period}</span>
          <h3 class="timeline-degree">${entry.degree}</h3>
          <div class="timeline-institution">${entry.institution} • ${entry.location}</div>
          <p class="timeline-description">${entry.description}</p>
          <ul style="margin-top: 1rem; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.4rem;">
            ${entry.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 7. Achievements Section
  const achievementsContainer = document.querySelector(".achievements-grid");
  if (achievementsContainer) {
    achievementsContainer.innerHTML = achievements
      .map(
        (a) => `
      <div class="achievement-card">
        <div class="achievement-icon-wrap">
          <i data-lucide="${a.icon}"></i>
        </div>
        <h4 class="achievement-title">${a.title}</h4>
        <div class="achievement-meta">${a.meta}</div>
        <p class="achievement-desc">${a.description}</p>
      </div>
    `
      )
      .join("");
  }

  // 8. Social Links (Footer & Nav)
  const footerSocials = document.querySelector(".footer-social-row");
  if (footerSocials) {
    footerSocials.innerHTML = socialLinks
      .map(
        (s) => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="${s.name}">
        <i data-lucide="${s.icon}"></i>
      </a>
    `
      )
      .join("");
  }

  // 9. Footer Text
  const footerTagline = document.querySelector(".footer-tagline");
  if (footerTagline) footerTagline.textContent = footer.tagline;

  const footerCopyright = document.querySelector(".footer-copyright");
  if (footerCopyright) footerCopyright.textContent = footer.copyright;
}

/**
 * Render skills grid based on category filter
 */
function renderSkillsGrid(categoryId) {
  const grid = document.querySelector(".skills-grid");
  if (!grid) return;

  const items =
    categoryId === "all"
      ? portfolioData.skills.items
      : portfolioData.skills.items.filter((s) => s.category === categoryId);

  grid.innerHTML = items
    .map(
      (item) => `
    <div class="skill-card" data-category="${item.category}">
      <div class="skill-card-top">
        <div class="skill-icon-box">
          <i data-lucide="${item.icon}"></i>
        </div>
        <span class="skill-category-badge">${item.category}</span>
      </div>
      <div>
        <h4 class="skill-name">${item.name}</h4>
        <p class="skill-description">${item.description}</p>
      </div>
    </div>
  `
    )
    .join("");

  // Re-create icons for freshly injected items
  if (typeof window.lucide !== "undefined") {
    window.lucide.createIcons();
  }
}

/**
 * Skills category filter buttons
 */
function initSkillsFilter() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".category-tab-btn");
    if (!btn) return;

    document.querySelectorAll(".category-tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    renderSkillsGrid(category);
  });
}

/**
 * Theme Toggle (Dark / Light mode)
 */
function initThemeToggle() {
  const toggleBtn = document.querySelector(".theme-toggle-btn");
  if (!toggleBtn) return;

  // Restore saved theme or default to dark
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeIcon(nextTheme);
  });
}

function updateThemeIcon(theme) {
  const toggleBtn = document.querySelector(".theme-toggle-btn");
  if (!toggleBtn) return;

  if (theme === "light") {
    toggleBtn.innerHTML = `<i data-lucide="moon"></i>`;
  } else {
    toggleBtn.innerHTML = `<i data-lucide="sun"></i>`;
  }

  if (typeof window.lucide !== "undefined") {
    window.lucide.createIcons();
  }
}

/**
 * Sticky Navigation & Scroll Spy
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link-item a, .mobile-nav-links a");
  const mobileToggle = document.querySelector(".mobile-toggle-btn");
  const mobileDrawer = document.querySelector(".mobile-drawer");

  // Scroll detection for sticky frosted header
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      // Active section highlight
      let currentSection = "";
      sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSection = sec.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    },
    { passive: true }
  );

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("open");
      mobileDrawer.classList.toggle("open");
      document.body.style.overflow = mobileDrawer.classList.contains("open") ? "hidden" : "";
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".mobile-nav-links a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileToggle.classList.remove("open");
        mobileDrawer.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }
}

/**
 * Project Detail Modal Handler
 */
function initProjectModal() {
  const backdrop = document.querySelector(".modal-backdrop");
  const closeBtn = document.querySelector(".modal-close-btn");
  if (!backdrop) return;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".open-modal-btn");
    if (!btn) return;

    const projectId = btn.getAttribute("data-project-id");
    const project = portfolioData.projects.find((p) => p.id === projectId);
    if (!project) return;

    // Populate modal
    const modalImage = backdrop.querySelector(".modal-hero-image");
    const modalTitle = backdrop.querySelector(".modal-title");
    const modalDesc = backdrop.querySelector(".modal-description");
    const modalTech = backdrop.querySelector(".modal-tech-list");
    const modalDemoBtn = backdrop.querySelector(".modal-demo-btn");
    const modalGithubBtn = backdrop.querySelector(".modal-github-btn");

    if (modalImage) modalImage.src = project.image;
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDesc) modalDesc.textContent = project.detailedOverview || project.description;
    if (modalTech) {
      modalTech.innerHTML = project.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("");
    }
    if (modalDemoBtn) {
      modalDemoBtn.href = project.demoUrl || "#";
    }
    if (modalGithubBtn) {
      modalGithubBtn.href = project.githubUrl || "#";
    }

    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close triggers
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      closeModal();
    }
  });

  function closeModal() {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/**
 * Interactive Contact Form
 */
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    const feedbackBanner = document.querySelector(".form-feedback-banner");
    const submitBtn = form.querySelector('button[type="submit"]');

    let isValid = true;

    // Reset error states
    form.querySelectorAll(".form-group").forEach((g) => g.classList.remove("has-error"));

    // Name check
    if (!nameInput.value.trim()) {
      nameInput.closest(".form-group").classList.add("has-error");
      isValid = false;
    }

    // Email check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailInput.closest(".form-group").classList.add("has-error");
      isValid = false;
    }

    // Message check
    if (messageInput.value.trim().length < 8) {
      messageInput.closest(".form-group").classList.add("has-error");
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending with loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display:inline-block; animation: spin 1s linear infinite;">⏳</span>
      <span>Transmitting...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      form.reset();

      if (feedbackBanner) {
        feedbackBanner.className = "form-feedback-banner success";
        feedbackBanner.innerHTML = `
          <strong>Message Received!</strong> Thank you for reaching out. Shubham will get back to you shortly at <strong>${emailInput.value || "your email"}</strong>.
        `;
      }
    }, 1200);
  });
}

/**
 * One-Click Copy Email Toast
 */
function initCopyEmail() {
  const copyBtn = document.querySelector(".copy-email-trigger");
  const toast = document.querySelector(".toast");
  if (!copyBtn || !toast) return;

  copyBtn.addEventListener("click", () => {
    const email = portfolioData.profile.contactEmail;
    navigator.clipboard.writeText(email).then(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3500);
    });
  });
}

/**
 * Back to Top
 */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top-btn");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 450) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
