const projects = [
  { images: ["Projects/other/ot.JPG"]},
  { images: ["Projects/other/ot1.JPG"] },
  { images: ["Projects/other/ot2.JPG"] },
  { images: ["Projects/other/ot3.JPG"] },
  { images: ["Projects/other/ot4.JPG"] },
  { images: ["Projects/other/ot5.JPG"] },
  { images: ["Projects/other/ot6.JPG"] },
  { images: ["Projects/other/ot7.JPG"] },
  { images: ["Projects/other/ot8.JPG"] },
  { images: ["Projects/other/ot9.JPG"] },
  { images: ["Projects/other/ot10.JPG"] },
  { images: ["Projects/other/ot11.JPG"] },
  { images: ["Projects/other/ot12.JPG"] },
  { images: ["Projects/other/ot13.JPG"] },
  { images: ["Projects/other/ot14.JPG"] },
  { images: ["Projects/other/ot15.JPG"] },
  { images: ["Projects/other/ot16.JPG"] },
  { images: ["Projects/other/ot17.JPG"] },
  { images: ["Projects/other/ot18.JPG"] },
  { images: ["Projects/other/ot19.JPG"] },
  { images: ["Projects/other/ot20.JPG"] },
  { images: ["Projects/other/ot21.JPG"] },
  { images: ["Projects/other/ot22.JPG"] },
  { images: ["Projects/other/ot23.JPG"] },
  { images: ["Projects/other/ot24.JPG"] },
  { images: ["Projects/other/ot25.JPG"] },
  { images: ["Projects/other/ot26.JPG"] },
  { images: ["Projects/other/ot27.JPG"] },
  { images: ["Projects/other/ot28.JPG"] },
  { images: ["Projects/other/ot29.JPG"] },
  { images: ["Projects/other/ot30.JPG"] },
  { images: ["Projects/other/ot31.JPG"] },
  { images: ["Projects/other/ot32.JPG"] },
  { images: ["Projects/other/ot33.JPG"] },
  { images: ["Projects/other/ot34.JPG"] },
  { images: ["Projects/other/ot35.JPG"] },
  { images: ["Projects/other/ot36.JPG"] }
];
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filter input[type="checkbox"]');
  const cards = document.querySelectorAll('.gallery .card');

  let currentProject = 0;
  let currentImage = 0;

  function filterCards() {
    const selectedTypes = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    cards.forEach(card => {
      const cardType = card.dataset.type;
      const visible = selectedTypes.length === 0 || selectedTypes.includes(cardType);
      card.style.display = visible ? 'inline-block' : 'none';
    });
  }

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-close">×</div>
    <div class="lightbox-nav lightbox-prev">‹</div>
    <img src="" alt="Full size image">
    <div class="lightbox-nav lightbox-next">›</div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const prevButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');

  function updateNav() {
    prevButton.style.display = currentImage > 0 ? 'block' : 'none';
    nextButton.style.display = currentImage < projects[currentProject].images.length - 1 ? 'block' : 'none';
  }

  function showLightbox(projectIndex, imageIndex) {
    currentProject = projectIndex;
    currentImage = imageIndex;
    lightboxImage.src = projects[projectIndex].images[imageIndex];
    lightbox.classList.add('open');
    updateNav();
  }

  cards.forEach(card => {
    const projectIndex = Number(card.dataset.project);
    const img = card.querySelector('img');
    card.addEventListener('click', event => {
      event.stopPropagation();
      const imageIndex = projects[projectIndex].images.indexOf(img.src);
      showLightbox(projectIndex, imageIndex >= 0 ? imageIndex : 0);
    });
  });

  prevButton.addEventListener('click', event => {
    event.stopPropagation();
    if (currentImage > 0) showLightbox(currentProject, currentImage - 1);
  });

  nextButton.addEventListener('click', event => {
    event.stopPropagation();
    if (currentImage < projects[currentProject].images.length - 1) {
      showLightbox(currentProject, currentImage + 1);
    }
  });

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target === closeButton) {
      lightbox.classList.remove('open');
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      lightbox.classList.remove('open');
    } else if (event.key === 'ArrowLeft' && currentImage > 0) {
      showLightbox(currentProject, currentImage - 1);
    } else if (event.key === 'ArrowRight' && currentImage < projects[currentProject].images.length - 1) {
      showLightbox(currentProject, currentImage + 1);
    }
  });

  checkboxes.forEach(checkbox => checkbox.addEventListener('change', filterCards));
  filterCards();
});