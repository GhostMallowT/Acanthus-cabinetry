function initializeCarousels() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel, index) => {
    let currentIndex = 0;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevPreview = carousel.querySelector('.carousel-preview-left .preview-image');
    const nextPreview = carousel.querySelector('.carousel-preview-right .preview-image');

    function showSlide(n) {
      if (n >= slides.length) currentIndex = 0;
      else if (n < 0) currentIndex = slides.length - 1;
      else currentIndex = n;

      // Hide all slides and deactivate dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Activate current
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');

      // Update preview images
      const nextIndex = (currentIndex + 1) % slides.length;
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

      if (nextPreview) {
        const nextImg = slides[nextIndex].querySelector('img');
        nextPreview.src = nextImg.src;
        nextPreview.alt = `Next: ${nextImg.alt}`;
      }

      if (prevPreview) {
        const prevImg = slides[prevIndex].querySelector('img');
        prevPreview.src = prevImg.src;
        prevPreview.alt = `Previous: ${prevImg.alt}`;
      }
    }

    // Button event listeners
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(currentIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(currentIndex + 1);
      });
    }

    // Dot clicks
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showSlide(i));
    });

    // Initialize
    showSlide(0);
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', initializeCarousels);

// Make images clickable
function makeImagesClickable() {
  document.querySelectorAll('.carousel-slide').forEach(slide => {
    const link = slide.querySelector('.carousel-link');
    if (link) {
      link.addEventListener('click', (e) => {
        // This allows normal link behavior
        // You can add extra behavior here later if needed
      });
    }
  });
}

// Call it after initializing carousels
document.addEventListener('DOMContentLoaded', () => {
  initializeCarousels();
  makeImagesClickable();
});