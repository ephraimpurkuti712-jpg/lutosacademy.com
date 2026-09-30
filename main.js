/**
 * Lotus Academy - Main Interactive Script
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Menu
  const hamburger = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = hamburger.querySelector("i");
      if (icon) {
        if (navMenu.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        const icon = hamburger.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  // Header Scroll Effect
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Animated Counter for Stats Ribbon
  const statNumbers = document.querySelectorAll(".stat-number");
  let started = false;

  function startCount(el) {
    const target = parseInt(el.getAttribute("data-target") || el.textContent, 10);
    const suffix = el.getAttribute("data-suffix") || "";
    let count = 0;
    const speed = 2000 / target;

    const counter = setInterval(() => {
      count += Math.ceil(target / 40);
      if (count >= target) {
        el.textContent = target + suffix;
        clearInterval(counter);
      } else {
        el.textContent = count + suffix;
      }
    }, 40);
  }

  window.addEventListener("scroll", () => {
    const statsSection = document.querySelector(".stats-ribbon");
    if (!statsSection || started) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      started = true;
      statNumbers.forEach(el => startCount(el));
    }
  });

  // Footer Year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
