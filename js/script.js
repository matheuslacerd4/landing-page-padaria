function toggleMenu() {
  document.querySelector(".nav ul").classList.toggle("active");
}

// carrosel
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const items = Array.from(document.querySelectorAll(".produto"));
  const totalItems = items.length;

  let visibleItems = 4;
  let step = 2;
  let index = 0;
  let timer = null;
  let intervalMs = 5000;
  let isMobile = false;

  function setMode() {
    isMobile = window.matchMedia("(max-width: 768px)").matches;

    visibleItems = isMobile ? 2 : 4;
    step = isMobile ? 1 : 2;
    intervalMs = isMobile ? 3000 : 5000;

    items.forEach((it) => {
      it.style.flex = `0 0 ${100 / visibleItems}%`;
    });

    if (index > totalItems - visibleItems) index = 0;
    updateCarousel();
    startAutoplay();
  }

  function updateCarousel() {
    const pct = (100 / visibleItems) * index;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${pct}%)`;
  }

  function next() {
    index += step;
    if (index >= totalItems) index = 0;
    updateCarousel();
  }

  function prev() {
    index -= step;
    if (index < 0) index = totalItems - visibleItems;
    updateCarousel();
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, intervalMs);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  nextBtn.addEventListener("click", () => {
    next();
    startAutoplay();
  });
  prevBtn.addEventListener("click", () => {
    prev();
    startAutoplay();
  });

  window.addEventListener("resize", setMode);

  setMode(); // inicializa conforme o viewport
});

// link header centralizado

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "center", // pode ser "start", "center", "end", "nearest"
    });
  });
});
