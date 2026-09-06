/* =========================================================
   NAVIGATION REVEAL ON SCROLL
   ========================================================= */
let lastScroll = 0;
const nav = document.getElementById("topRevealNav");

window.addEventListener("scroll", () => {
  const current = window.pageYOffset;
  nav.style.top = current < lastScroll ? "0px" : "-90px";
  lastScroll = current;
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
   MOBILE MENU TOGGLE
   ========================================================= */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.onclick = () => {
  mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
};

/* =========================================================
   DARK MODE TOGGLE
   ========================================================= */
const darkToggle = document.getElementById("darkToggle");
darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

/* =========================================================
   PORTFOLIO FILTERING
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
      card.style.display = (filter === "all" || category === filter) ? "block" : "none";
    });
  });
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
