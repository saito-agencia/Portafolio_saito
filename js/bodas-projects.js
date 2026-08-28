const bodasData = [
    {
        id: 'bodas-1',
        title: 'Boda en la Playa',
        category: 'Bodas',
        description: 'Una boda espectacular con vista al mar...',
        type: 'bodas-showcase',
        coverCarousel: [
            'assets/images/bodas/carrusel/carrusel 1.webp',
            'assets/images/bodas/carrusel/carrusel 2.webp',
            'assets/images/bodas/carrusel/carrusel 3.webp',
            'assets/images/bodas/carrusel/carrusel 4.webp',
            'assets/images/bodas/carrusel/carrusel 5.webp'
        ],
        elements: []
    }
];

function createCoverCarouselHTML(images) {
    let html = '<div class="cover-carousel">';
    images.forEach((img, index) => {
        const activeClass = index === 0 ? 'active' : '';
        html += `<img src="${img}" class="carousel-slide ${activeClass}" alt="Carousel Image ${index + 1}">`;
    });
    html += '</div>';
    return html;
}

function renderProjects() {
    const grid = document.getElementById('bodas-grid');
    if (!grid) return;

    bodasData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'project-card glass-card fade-in framed-card';
        card.dataset.type = item.type;

        const imgContainer = document.createElement('div');
        imgContainer.className = 'project-img-container';
        
        if (item.coverCarousel) {
            imgContainer.innerHTML = createCoverCarouselHTML(item.coverCarousel);
        } else {
            // Fallback for normal images
            imgContainer.innerHTML = `<img src="${item.image}" alt="${item.title}" class="project-img">`;
        }

        const info = document.createElement('div');
        info.className = 'project-info';
        
        const cat = document.createElement('span');
        cat.className = 'project-category badge';
        cat.textContent = item.category;
        
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = item.title;
        
        const desc = document.createElement('p');
        desc.className = 'project-desc';
        desc.textContent = item.description;

        info.appendChild(cat);
        info.appendChild(title);
        info.appendChild(desc);

        card.appendChild(imgContainer);
        card.appendChild(info);

        // Click event placeholder (can open modal if needed)
        card.addEventListener('click', () => {
            console.log("Clicked bodas item", item.id);
        });

        grid.appendChild(card);
    });

    // Initialize carousel intervals
    initCoverCarousels();
}

function initCoverCarousels() {
    const carousels = document.querySelectorAll('.cover-carousel');
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentIdx = 0;
        
        if (slides.length <= 1) return;

        setInterval(() => {
            slides[currentIdx].classList.remove('active');
            currentIdx = (currentIdx + 1) % slides.length;
            slides[currentIdx].classList.add('active');
        }, 3000); // Change every 3 seconds
    });
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Stop any playing videos if present
        const videos = modal.querySelectorAll('video');
        videos.forEach(v => v.pause());
    }
}
