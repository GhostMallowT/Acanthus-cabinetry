constProjects = [
  {
    images: [
      "Projects/bedroom/bedroom/bed.JPG",
    ]
  },
  {
    images: [
      "Projects/bedroom/bedroom1/bed1.JPG",
    ]
  },
  {
    images: [
      "Projects/bedroom/bedroom2/bed2.JPG",
      "Projects/bedroom/bedroom2/bed2a.JPG",
      "Projects/bedroom/bedroom2/bed2b.JPG",
    ]
  },
  {
    images: [
      "Projects/bedroom/bedroom3/bed3.JPG",
      "Projects/bedroom/bedroom3/bed3a.JPG",
      "Projects/bedroom/bedroom3/bed3b.JPG",
      "Projects/bedroom/bedroom3/bed3c.JPG",
      "Projects/bedroom/bedroom3/bed3d.JPG",
      "Projects/bedroom/bedroom3/bed3e.JPG",
      "Projects/bedroom/bedroom3/bed3f.JPG",
    ]
  },
  {
    images: [
      "Projects/bedroom/bedroom4/bed4.JPG",
    ]
  },
  {
    images: [
      "Projects/bedroom/bedroom5/bed5.JPG",
    ]
  },

];

document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filter input[type="checkbox"]');
  const cards = document.querySelectorAll('.gallery .card');

  let currenProject = 0;
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
    <div class="lightbox-nav lightboxPrev">‹</div>
    <img src="" alt="Full size image">
    <div class="lightbox-nav lightbox-next">›</div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.lightbox-close');
  constPrevButton = lightbox.querySelector('.lightboxPrev');
  const nextButton = lightbox.querySelector('.lightbox-next');

  function updateNav() {
  PrevButton.style.display = currentImage > 0 ? 'block' : 'none';
    nextButton.style.display = currentImage <Projects[currenProject].images.length - 1 ? 'block' : 'none';
  }

  function showLightboxProjectIndex, imageIndex) {
    currenProject =ProjectIndex;
    currentImage = imageIndex;
    lightboxImage.src =ProjectsProjectIndex].images[imageIndex];
    lightbox.classList.add('open');
    updateNav();
  }

  cards.forEach(card => {
    constProjectIndex = Number(card.datasetProject);
    const img = card.querySelector('img');
    card.addEventListener('click', event => {
      event.stoPropagation();
      const imageIndex =ProjectsProjectIndex].images.indexOf(img.src);
      showLightboxProjectIndex, imageIndex >= 0 ? imageIndex : 0);
    });
  });

PrevButton.addEventListener('click', event => {
    event.stoPropagation();
    if (currentImage > 0) showLightbox(currenProject, currentImage - 1);
  });

  nextButton.addEventListener('click', event => {
    event.stoPropagation();
    if (currentImage <Projects[currenProject].images.length - 1) {
      showLightbox(currenProject, currentImage + 1);
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
      showLightbox(currenProject, currentImage - 1);
    } else if (event.key === 'ArrowRight' && currentImage <Projects[currenProject].images.length - 1) {
      showLightbox(currenProject, currentImage + 1);
    }
  });

  checkboxes.forEach(checkbox => checkbox.addEventListener('change', filterCards));
  filterCards();
});