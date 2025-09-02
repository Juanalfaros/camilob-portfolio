document.addEventListener("DOMContentLoaded", () => {
  // --- Cursor Glow Effect ---
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow) {
    document.addEventListener("mousemove", (e) => {
      const glowSize = cursorGlow.offsetWidth || 600;
      cursorGlow.style.transform = `translate(${e.clientX - glowSize / 2}px, ${
        e.clientY - glowSize / 2
      }px)`;
    });
  }

  // --- Header background on scroll ---
  const header = document.getElementById("header");
  if (header) {
    const onScrollHeader = () => {
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScrollHeader);
    onScrollHeader();
  }

  // --- Mobile Menu Elements ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu"); // overlay
  const menuIcon = document.getElementById("menu-icon");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
  const mobilePanel = document.querySelector(".mobile-menu-panel");
  const firstMobileLink = document.querySelector(".mobile-nav-item");

  const isOpen = () => mobileMenu && !mobileMenu.classList.contains("hidden");

  const lockBody = (lock) => {
    document.body.classList.toggle("overflow-hidden", !!lock);
  };

  const setIcon = (open) => {
    if (!menuIcon) return;
    menuIcon.classList.toggle("ph-x", !!open);
    menuIcon.classList.toggle("ph-list", !open);
  };

  const openMenuA11y = () => {
    if (!mobileMenuBtn) return;
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    mobileMenuBtn.setAttribute("aria-label", "Cerrar menú");
    setTimeout(() => firstMobileLink && firstMobileLink.focus(), 50);
  };

  const closeMenuA11y = () => {
    if (!mobileMenuBtn) return;
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenuBtn.setAttribute("aria-label", "Abrir menú");
    mobileMenuBtn.focus();
  };

  const openMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("hidden");
    lockBody(true);
    setIcon(true);
    openMenuA11y();
  };

  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.add("hidden");
    lockBody(false);
    setIcon(false);
    closeMenuA11y();
  };

  const toggleMenu = () => (isOpen() ? closeMenu() : openMenu());

  // Botón
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMenu);
  }

  // Clic en links
  mobileNavItems.forEach((item) => item.addEventListener("click", closeMenu));

  // Clic fuera del panel (overlay)
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (mobilePanel) {
        if (!e.target.closest(".mobile-menu-panel")) closeMenu();
      } else if (e.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  // Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // Cambiar a desktop => cerrar
  const desktopMq = window.matchMedia("(min-width: 768px)");
  const handleMq = (mq) => {
    if (mq.matches && isOpen()) closeMenu();
  };
  desktopMq.addEventListener
    ? desktopMq.addEventListener("change", handleMq)
    : desktopMq.addListener(handleMq);
  handleMq(desktopMq);

  // --- Active Navigation Link Highlighting ---
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-item");

  const updateActiveNav = () => {
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active-nav");
      if (item.getAttribute("href") === `#${currentSectionId}`) {
        item.classList.add("active-nav");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => observer.observe(el));
});
