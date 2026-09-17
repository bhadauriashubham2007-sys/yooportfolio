/**
 * HERO WEBGL CANVAS BACKGROUND
 * Interactive particle constellation responding to mouse parallax
 * Lightweight, 60fps+, battery-friendly with auto-pause on scroll
 */

export function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    canvas.style.display = "none";
    return;
  }

  // Fallback to 2D canvas if Three is not loaded or WebGL is disabled
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  let animationFrameId;
  let isHeroVisible = true;

  // Particle configuration
  const particleCount = Math.min(Math.floor((width * height) / 14000), 85);
  const particles = [];

  function getParticleColor(alpha = 1) {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      return `rgba(99, 102, 241, ${alpha * 0.45})`;
    }
    return `rgba(165, 180, 252, ${alpha * 0.75})`;
  }

  function getLineColor(alpha = 1) {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      return `rgba(99, 102, 241, ${alpha * 0.15})`;
    }
    return `rgba(99, 102, 241, ${alpha * 0.22})`;
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.5 + 0.3,
    });
  }

  // Handle Resize
  function onResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", onResize, { passive: true });

  // Handle Mouse / Pointer Parallax
  window.addEventListener(
    "mousemove",
    (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    },
    { passive: true }
  );

  // Performance: Pause animation when hero is scrolled out of viewport
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible && !animationFrameId) {
          loop();
        }
      });
    },
    { threshold: 0.05 }
  );

  const heroSection = document.getElementById("home");
  if (heroSection) {
    heroObserver.observe(heroSection);
  }

  // Render loop
  function loop() {
    if (!isHeroVisible) {
      animationFrameId = null;
      return;
    }

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Subtle mouse repulsion / attraction
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 180) {
        const force = (180 - dist) / 180;
        p.x -= (dx / dist) * force * 1.5;
        p.y -= (dy / dist) * force * 1.5;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = getParticleColor(p.baseAlpha);
      ctx.fill();

      // Connect near particles with delicate lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const pDx = p.x - p2.x;
        const pDy = p.y - p2.y;
        const pDist = Math.sqrt(pDx * pDx + pDy * pDy);

        if (pDist < 130) {
          const lineAlpha = (1 - pDist / 130) * 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = getLineColor(lineAlpha);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  loop();
}
