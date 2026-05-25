const projects = [
  {
    images: [
      "Projects/kitchen/kitchen/k.JPG"
    ]
  },
  {
    images: [
      "Projects/kitchen/kitchen1/k1.JPG",
      "Projects/kitchen/kitchen1/k1a.JPG"
    ]
  },
  {
    images: [
      "projects/kitchen/kitchen2/k2.JPG"
    ]
  },
  {
    images: [
      "projects/kitchen/kitchen3/k3.JPG",
      "projects/kitchen/kitchen3/k3a.JPG",
      "projects/kitchen/kitchen3/k3b.JPG"
    ]
  },
  {
        images: [
        "Projects/kitchen/kitchen4/k4.JPG",
        "projects/kitchen/kitchen4/k4a.JPG",
        "projects/kitchen/kitchen4/k4b.JPG"
    ]
  },
  {
        images: [
        "Projects/kitchen/k5.JPG"
    ]
  },
  {
    images: [
      "Projects/kitchen/kitchen6/k6.JPG",
      "Projects/kitchen/kitchen6/k6a.JPG",
    ]
  },
  {
    images: [
      "Projects/kitchen/k7.JPG",
    ]
  },
  {
    images: [
      "Projects/kitchen8/k8.JPG",
      "Projects/kitchen8/k8a.JPG",
      "Projects/kitchen8/k8b.JPG",
      "Projects/kitchen8/k8c.JPG",
    ]
  },
  {
    images: [
      "Projects/kitchen/k9.JPG"
    ]
  },
  {
    images: [
      "Projects/kitchen/kitchen9/k9.JPG",
      "Projects/kitchen/kitchen9/k9a.JPG",
      "Projects/kitchen/kitchen9/k9b.JPG"
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