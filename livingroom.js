const projects = [
  {
    images: [
      "Projects/livingroom/l1.JPG",
    ]
  },
  {
    images: [
      "Projects/livingroom/l1/l1.JPG",
      "Projects/livingroom/l1/l2.JPG",
      "Projects/livingroom/l1/l3.JPG",
      "Projects/livingroom/l1/l4.JPG",
      "Projects/livingroom/l1/l5.JPG",
      "Projects/livingroom/l1/l6.JPG",
      "Projects/livingroom/l1/l7.JPG",
    ]
  },
  {
    images: [
      "Projects/livingroom/l2/.JPG",
      "Projects/livingroom/l2/l2.JPG",
    ]
  },
  {
    images: [
      "Projects/livingroom/l3/l1.JPG",
      "Projects/livingroom/l3/l2.JPG",
    ]
  },
  {
    images: [
      "Projects/livingroom/l4/l1.JPG",
      "Projects/livingroom/l4/l2.JPG",
      "Projects/livingroom/l4/l3.JPG",
      "Projects/livingroom/l4/l4.JPG",
      "Projects/livingroom/l4/l5.JPG",
      "Projects/livingroom/l4/l6.JPG",
      "Projects/livingroom/l4/l7.JPG",
    ]
  },
  {
    images: [
        "Projects/livingroom/l5/l1.JPG",
        "Projects/livingroom/l5/l2.JPG",
    ]
  },
  {
    images: [
      "Projects/livingroom/l6/.JPG",
    ]
  },
  {
    images: [
      "Projects/livingroom/l7/.JPG",
    ]
  },
  {
    images: [
        "Projects/livingroom/l8/.JPG",
    ]
  },
  {
    images: [
      "Projects/livingroom/l9/.JPG",
    ]
  },
  {
    images: [
        "Projects/livingroom/l10/l1.JPG",
    ]
  },
  {
    images: [
      "Projects/livingroom/l11/l1.JPG",
    ]
  },
  {
    images: [
      "Projects/livingroom/l12/l1.JPG",
    ]
  }
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