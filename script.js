// Pippin & Pals — Branding Page Animations
// Using GSAP for smooth, performant, and premium interactions

(function () {
  'use strict';

  // Ensure GSAP is loaded
  if (typeof gsap === 'undefined') return;

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Slow Continuous Rotation (Stamps & Badges)
  // Rotating the brand stamp and small browser stamp infinitely
  gsap.to(".s03-stamp, .br-stamp", {
    rotation: 360,
    duration: 30, // Very slow rotation
    repeat: -1,
    ease: "none"
  });

  // 2. Magical Floating & Swaying Effect (Logos & Icons)
  // Replaces heartbeat with a premium levitation effect
  const interactiveTargets = ".s01-logo-wrap, .s22-logo, .s08-icon-box";
  
  gsap.to(interactiveTargets, {
    y: -15, // Smoothly float up
    rotation: 5, // Gentle tilt to the right
    duration: 3.5, // Diperlambat agar lebih soft
    repeat: -1,
    yoyo: true, // Go back down and un-tilt
    stagger: 0.3, // Wave-like offset between elements
    ease: "sine.inOut"
  });

  // Add highly interactive 'boop' pop on hover without breaking the float
  gsap.utils.toArray(interactiveTargets).forEach(el => {
    el.style.cursor = "pointer"; 
    
    el.addEventListener("mouseenter", () => {
      // Playful springy pop that scales it up happily!
      // (This only affects scale, so it continues floating smoothly)
      gsap.to(el, {
        scale: 1.15, // Skala dikurangi sedikit agar santai
        duration: 0.8, // Durasi diperpanjang
        ease: "elastic.out(1, 0.5)", // Pantulan diperhalus
        onComplete: () => {
          // Gently return to original scale
          gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out" }); 
        }
      });
    });
  });

  // 3. High-End Section Reveals (Scroll Triggered)
  
  // Basic Fade & Slide for text/standard elements
  const slideReveals = [
    { target: ".s02-title, .s02-body", trigger: "#s02" },
    { target: ".s04-col", trigger: "#s04", stagger: 0.15 },
    { target: ".s05 .content-pad, .s06 .content-pad", trigger: ".s05", stagger: 0.2 },
    { target: ".s08-icons, .s08-desc", trigger: "#s08", stagger: 0.2 },
    { target: ".ig-card", trigger: "#s18", y: 40 }
  ];

  slideReveals.forEach(reveal => {
    gsap.from(reveal.target, {
      scrollTrigger: { trigger: reveal.trigger, start: "top 85%" },
      opacity: 0, y: reveal.y || 40, duration: 1.6, stagger: reveal.stagger || 0, ease: "power2.out"
    });
  });

  // Dedicated Closing Text Reveal (Slide from left) S22
  gsap.from(".s22-text", {
    scrollTrigger: { trigger: ".s22", start: "top 75%" },
    x: -100, // Geser masuk dari arah kiri (negatif)
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
  });

  // Stunning Photo Split-Wipe Reveals and Hover Zoom for s07, s10, s12
  // S07: 2 Columns Staggered Wipe & Hover Zoom
  const groupS07 = gsap.utils.toArray(".s07-left, .s07-right");
  if (groupS07.length) {
    gsap.from(groupS07, {
      scrollTrigger: { trigger: ".s07", start: "top 75%" },
      clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)", // Vertical split wipe
      opacity: 0, duration: 2, stagger: 0.4, ease: "power3.out"
    });
    groupS07.forEach(col => {
      const img = col.querySelector("img");
      col.addEventListener("mouseenter", () => gsap.to(img, { scale: 1.08, duration: 0.8, ease: "power2.out" }));
      col.addEventListener("mouseleave", () => gsap.to(img, { scale: 1, duration: 1, ease: "power2.out" }));
    });
  }

  // S10: 2 Side Photos Staggered Horizontal Wipe & Hover Zoom
  const groupS10 = gsap.utils.toArray(".s10-left-photo, .s10-right-photo");
  if (groupS10.length) {
    gsap.from(groupS10, {
      scrollTrigger: { trigger: ".s10", start: "top 75%" },
      clipPath: "polygon(50% 0%, 50% 100%, 50% 100%, 50% 0%)", // Horizontal split wipe
      opacity: 0, duration: 2, stagger: 0.4, ease: "power3.out"
    });
    groupS10.forEach(img => {
      img.addEventListener("mouseenter", () => gsap.to(img, { scale: 1.06, duration: 0.8, ease: "power2.out" }));
      img.addEventListener("mouseleave", () => gsap.to(img, { scale: 1, duration: 1, ease: "power2.out" }));
    });
  }

  // S12: Subtle Default Wipe-up
  gsap.from(".s12 img", {
    scrollTrigger: { trigger: ".s12", start: "top 80%" },
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    opacity: 0, scale: 1.15, duration: 1.6, ease: "power4.out"
  });

  // Dedicated S20 Bag Mockup Reveal (Scroll In View)
  const s20Img = document.querySelector(".s20 img");
  if (s20Img) {
    // Reveal via gentle Scroll Scrub
    gsap.fromTo(s20Img, 
      { yPercent: 20, scale: 0.9, opacity: 0 },
      { scrollTrigger: { trigger: ".s20", start: "top 85%", end: "center center", scrub: 1 }, yPercent: 0, scale: 1, opacity: 1, ease: "none" }
    );
  }

  // Dedicated S21 Gallery Reveal & Interactive Hover Zoom
  const s21Cells = gsap.utils.toArray(".s21-cell");
  if (s21Cells.length) {
    // Staggered Split-Wipe Reveal
    gsap.from(s21Cells, {
      scrollTrigger: { trigger: ".s21", start: "top 75%" },
      clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)", // Wipe outwards vertically
      opacity: 0, duration: 1.8, stagger: 0.3, ease: "power3.out"
    });
    
    // Premium Zoom in on hover
    s21Cells.forEach(cell => {
      const img = cell.querySelector("img");
      cell.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.12, duration: 0.8, ease: "power2.out" });
      });
      cell.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 1, ease: "power2.out" });
      });
    });
  }

  // Elastic Pop Reveals for Logos & Cards (s09, s19)
  gsap.utils.toArray(".s09-inner > div, .s19-inner img").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el.parentNode, start: "top 85%" },
      scale: 0, opacity: 0, 
      rotation: () => (Math.random() - 0.5) * 20, // Random playful twist
      duration: 2, stagger: 0.3, 
      ease: "elastic.out(1, 0.6)"
    });
  });

  // 3D Cinematic Reveal (s16 Logotype)
  gsap.from(".s16 img:not(.s16-bg)", {
    scrollTrigger: { trigger: ".s16", start: "top 80%" },
    y: 100, rotationX: -15, opacity: 0, 
    transformPerspective: 1000,
    duration: 2.2, ease: "power2.out"
  });

  // Responsive Scroll Scrub 3D Fold (s17 Landing Page Mockup)
  gsap.set(".s17", { perspective: 1500 });
  const s17Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".s17",
      start: "top bottom", // Momen section mulai masuk dari bawah layar
      end: "bottom top",   // Momen section telah keluar dari atas layar
      scrub: 1             // Mengaitkan pergerakan mulus sesuai dengan posisi scroll
    }
  });

  // Fase 1: Masuk dari bawah (Lipat Tegang & Mengecil) -> Berada di tengah Layar (Membuka Penuh/Datar)
  s17Tl.fromTo(".s17 img", 
    { rotationX: -30, scale: 0.85, y: 100, opacity: 0.3 }, 
    { rotationX: 0, scale: 1, y: 0, opacity: 1, duration: 1, ease: "none" }
  )
  // Fase 2: Naik ke atas (Mulai Menutup perlahan dan Mengecil lagi)
  .to(".s17 img", {
    rotationX: 30, scale: 0.85, y: -100, opacity: 0.3, duration: 1, ease: "none"
  });

  // 4. Dramatic Parallax Scrubber (Full Width Hero/Photos)
  gsap.utils.toArray(".s01-bg, .s03-bg, .s11 img, .s15 img, .s16-bg, .s22-bg").forEach(bg => {
    gsap.fromTo(bg, { yPercent: -15, scale: 1.1 }, {
      scrollTrigger: { trigger: bg.parentNode, start: "top bottom", end: "bottom top", scrub: 1 },
      yPercent: 15, // Parallax slide
      ease: "none"
    });
  });

  // 5. Special Slide Reveals (Images)
  // S14 Thank You Cards sliding in smoothly from opposite sides
  gsap.from(".ty-card-img-front", {
    scrollTrigger: { trigger: "#s14", start: "top 80%" },
    x: -100, rotate: -15, opacity: 0, duration: 1.8, ease: "back.out(1.2)"
  });

  gsap.from(".ty-card-img-back", {
    scrollTrigger: { trigger: "#s14", start: "top 75%" },
    x: 100, rotate: 15, opacity: 0, duration: 1.8, ease: "back.out(1.2)"
  });

  // 6. Smooth Endless Marquee Loop (S13)
  const s13Row = document.querySelector(".s13-row");
  if (s13Row) {
    // Duplicate multiple times to create an ultra-long continuous robust track avoiding whitespace
    const origHTML = s13Row.innerHTML;
    s13Row.innerHTML = origHTML + origHTML + origHTML + origHTML;
    
    // Total is 4 blocks. Shifting -25% moves exactly 1 original block seamlessly
    gsap.to(".s13-row", {
      xPercent: -25,
      ease: "none",
      duration: 30, // Adjusted duration for the new track length
      repeat: -1
    });
  }

  // 6. Custom Magical Cursor (Only on Desktop)
  if (window.matchMedia("(min-width: 1024px)").matches) {
    const cursor = document.createElement("div");
    cursor.classList.add("magic-cursor");
    document.body.appendChild(cursor);

    const cursorDot = document.createElement("div");
    cursorDot.classList.add("magic-cursor-dot");
    document.body.appendChild(cursorDot);

    // Fast GSAP setters for performance
    let xSet = gsap.quickSetter(cursor, "x", "px");
    let ySet = gsap.quickSetter(cursor, "y", "px");
    let topSet = gsap.quickSetter(cursorDot, "x", "px");
    let leftSet = gsap.quickSetter(cursorDot, "y", "px");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Immediate update for dot
      topSet(mouseX);
      leftSet(mouseY);
    });

    gsap.ticker.add(() => {
      // Smooth lerp for outer ring
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      xSet(cursorX);
      ySet(cursorY);
    });

    // Expand cursor on hoverable items
    const hoverables = document.querySelectorAll("a, button, .s01-logo-wrap, .s22-logo, .s08-icon-box, .ps-sq, .ig-grid-cell, .s09-item, .s07-item");
    hoverables.forEach(el => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { width: 80, height: 80, backgroundColor: "var(--pistachio)", borderColor: "var(--brown)", opacity: 0.8, duration: 0.3 });
        gsap.to(cursorDot, { scale: 0, duration: 0.2 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { width: 48, height: 48, backgroundColor: "rgba(255,241,161,0.4)", borderColor: "var(--apricot)", opacity: 1, duration: 0.3 });
        gsap.to(cursorDot, { scale: 1, duration: 0.2 });
      });
    });

    // 7. Magnetic Parallax Hover for Primary Logos
    const magneticLogos = document.querySelectorAll(".s01-logo-wrap img, .s22-logo");
    magneticLogos.forEach(logo => {
      logo.addEventListener("mousemove", (e) => {
        const rect = logo.getBoundingClientRect();
        // Calc normalized coords (-1 to +1)
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        
        gsap.to(logo, {
          x: x * 20,
          y: y * 20,
          rotation: x * 10,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      });

      logo.addEventListener("mouseleave", () => {
        gsap.to(logo, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  }

  console.log('Pippin & Pals: Premium Motion activated.');

})();
