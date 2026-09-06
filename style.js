/* =========================================================
   NAVIGATION REVEAL ON SCROLL (FULLY ENHANCED)
   ========================================================= */
let lastScroll = 0;
const nav = document.getElementById("topRevealNav");

// Add reveal shadow only when visible
function updateNavShadow(visible) {
  nav.style.boxShadow = visible
    ? "0 0 25px rgba(255,255,255,0.15)"
    : "none";
}

window.addEventListener("scroll", () => {
  const current = window.pageYOffset;

  // Always show nav near top
  if (current < 50) {
    nav.style.top = "0px";
    nav.style.opacity = "1";
    updateNavShadow(true);
    lastScroll = current;
    return;
  }

  // Reveal when scrolling up
  if (current < lastScroll) {
    nav.style.top = "0px";
    nav.style.opacity = "1";
    updateNavShadow(true);
  }

  // Hide when scrolling down
  else {
    nav.style.top = "-90px";
    nav.style.opacity = "0";
    updateNavShadow(false);
  }

  lastScroll = current;
});

/* =========================================================
   MOBILE MENU TOGGLE
   ========================================================= */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.onclick = () => {
  const isOpen = mobileMenu.style.display === "flex";
  mobileMenu.style.display = isOpen ? "none" : "flex";
  hamburger.setAttribute("aria-expanded", String(!isOpen));
  hamburger.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");

  // Mobile reveal behavior: keep nav visible when menu is open
  nav.style.top = isOpen ? "-90px" : "0px";
  nav.style.opacity = isOpen ? "0" : "1";
};

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.style.display = "none";
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");
  });
});

/* =========================================================
   FADE-IN ON SCROLL
   ========================================================= */
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});
faders.forEach(el => observer.observe(el));

/* =========================================================
   DARK MODE TOGGLE
   ========================================================= */
const darkToggle = document.getElementById("darkToggle");
darkToggle.onclick = () => {
  const isDark = document.body.classList.toggle("dark");
  darkToggle.setAttribute("aria-pressed", String(isDark));
};

/* =========================================================
   PORTFOLIO FILTERING (PATCHED + SMOOTH FADE)
   ========================================================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioGrid = document.getElementById("portfolioGrid");
const cards = portfolioGrid.querySelectorAll(".card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category;

      const isVisible = filter === "all" || category === filter;
      card.style.display = isVisible ? "" : "none";
      card.style.opacity = isVisible ? "1" : "0";
    });
  });
});

/* =========================================================
   PORTFOLIO IMAGE LIGHTBOX
   ========================================================= */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrevious = document.getElementById("lightboxPrevious");
const lightboxNext = document.getElementById("lightboxNext");
const portfolioImages = portfolioGrid.querySelectorAll(".card img");
let previouslyFocusedElement;
let currentImageIndex = 0;
let currentGalleryImages = [];

function showLightboxImage(index) {
  currentImageIndex = (index + currentGalleryImages.length) % currentGalleryImages.length;
  const image = currentGalleryImages[currentImageIndex];
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  lightboxImage.src = "";
  previouslyFocusedElement?.focus();
}

function openLightbox(image) {
  previouslyFocusedElement = document.activeElement;
  currentGalleryImages = Array.from(image.closest(".card").querySelectorAll("img"));
  lightboxPrevious.hidden = currentGalleryImages.length < 2;
  lightboxNext.hidden = currentGalleryImages.length < 2;
  showLightboxImage(currentGalleryImages.indexOf(image));
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

portfolioImages.forEach(image => {
  image.addEventListener("click", () => openLightbox(image));
  image.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
  image.tabIndex = 0;
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Enlarge ${image.alt}`);
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrevious.addEventListener("click", () => showLightboxImage(currentImageIndex - 1));
lightboxNext.addEventListener("click", () => showLightboxImage(currentImageIndex + 1));
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showLightboxImage(currentImageIndex - 1);
  if (event.key === "ArrowRight") showLightboxImage(currentImageIndex + 1);
});

/* =========================================================
   FADE TRANSITION FOR DUAL-IMAGE CARDS
   ========================================================= */
const fadeCards = document.querySelectorAll('.fade-card');

fadeCards.forEach(card => {
  const imgs = card.querySelectorAll('.fade-img');
  let index = 0;

  setInterval(() => {
    imgs[index].classList.remove('active');
    index = (index + 1) % imgs.length;
    imgs[index].classList.add('active');
  }, 4000);
});

/* =========================================================
   DRAG & DROP UPLOAD
   ========================================================= */
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");

dropzone.addEventListener("click", () => fileInput.click());

dropzone.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fileInput.click();
  }
});

dropzone.addEventListener("dragover", e => {
  e.preventDefault();
  dropzone.classList.add("dragover");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("dragover");
});

dropzone.addEventListener("drop", e => {
  e.preventDefault();
  dropzone.classList.remove("dragover");
  fileInput.files = e.dataTransfer.files;
});
