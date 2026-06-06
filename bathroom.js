const projects = [
  {
    images: [
      "Projects/bathroom/b/b1.JPG",
    ]
  },
  {
    images: [
      "Projects/bathroom/b1/b1.JPG",
      "Projects/bathroom/b1/b2.JPG",
      "Projects/bathroom/b1/b3.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b2/b1.JPG",
        "Projects/bathroom/b2/b2.JPG",
    ]
  },
  {
    images: [
      "Projects/bathroom/b3/b1.JPG",
      "Projects/bathroom/b3/b2.JPG",
      "Projects/bathroom/b3/b3.JPG",
    ]
  },
  {
    images: [
      "Projects/bathroom/b4/b1.JPG",
      "Projects/bathroom/b4/b2.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b5/b1.JPG",
        "Projects/bathroom/b5/b2.JPG",
        "Projects/bathroom/b5/b3.JPG",
    ]
  },
  {
    images: [
      "Projects/bathroom/b6/b1.JPG",
      "Projects/bathroom/b6/b2.JPG",
      "Projects/bathroom/b6/b3.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b7/b1.JPG",
        "Projects/bathroom/b7/b2.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b8/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b9/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b10/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b11/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b12/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b13/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b14/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b15/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b16/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b17/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b18/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b19/b1.JPG",
    ]
  },
  {
    images: [
        "Projects/bathroom/b20/b1.JPG",
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