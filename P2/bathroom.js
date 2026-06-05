const projects = [
  {
    images: [
      "../Projects/bathroom/bathroom/b.jpg",
      "../Projects/bathroom/bathroom/ba.jpg",
      "../Projects/bathroom/bathroom/bb.jpg",
    ]
  },
  {
    images: [
      "../Projects/bathroom/bathroom1/b1.jpg",
      "../Projects/bathroom/bathroom1/b1a.jpg",
      "../Projects/bathroom/bathroom1/b1b.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom2/b2.jpg",
    ]
  },
  {
    images: [
      "../Projects/bathroom/bathroom3/b3.jpg",
      "../Projects/bathroom/bathroom3/b3a.jpg",
    ]
  },
  {
    images: [
      "../Projects/bathroom/bathroom4/b4.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom5/b5.jpg",
        "../Projects/bathroom/bathroom5/b5a.jpg",
        "../Projects/bathroom/bathroom5/b5b.jpg",
    ]
  },
  {
    images: [
      "../Projects/bathroom/bathroom6/b6.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom7/b7.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom8/b8.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom9/b9.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom10/b10.jpg",
        "../Projects/bathroom/bathroom10/b10a.jpg",
        "../Projects/bathroom/bathroom10/b10b.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom11/b11.jpg",
        "../Projects/bathroom/bathroom11/b11a.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom12/b12.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom13/b13.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom14/b14.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom15/b15.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom16/b16.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom17/b17.jpg",
    ]
  },
  {
    images: [
        "../Projects/bathroom/bathroom18/b18.jpg",
    ]
  },
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