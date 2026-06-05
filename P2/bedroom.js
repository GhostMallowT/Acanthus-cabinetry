const projects = [
  {
    images: [
      "../Projects/bedroom/bedroom/bed.jpg",
    ]
  },
  {
    images: [
      "../Projects/bedroom/bedroom1/bed1.jpg",
    ]
  },
  {
    images: [
      "../Projects/bedroom/bedroom2/bed2.jpg",
      "../Projects/bedroom/bedroom2/bed2a.jpg",
      "../Projects/bedroom/bedroom2/bed2b.jpg",
    ]
  },
  {
    images: [
      "../Projects/bedroom/bedroom3/bed3.jpg",
      "../Projects/bedroom/bedroom3/bed3a.jpg",
      "../Projects/bedroom/bedroom3/bed3b.jpg",
      "../Projects/bedroom/bedroom3/bed3c.jpg",
      "../Projects/bedroom/bedroom3/bed3d.jpg",
      "../Projects/bedroom/bedroom3/bed3e.jpg",
      "../Projects/bedroom/bedroom3/bed3f.jpg",
    ]
  },
  {
    images: [
      "../Projects/bedroom/bedroom4/bed4.jpg",
    ]
  },
  {
    images: [
      "../Projects/bedroom/bedroom5/bed5.jpg",
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