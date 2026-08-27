/* ==========================================================================
   PORTAFOLIO DE RENÉ SAITO - GALERÍAS DE FOTOGRAFÍA Y DISEÑO
   ========================================================================== */

/* ---------- DATA ---------- */

const photographyData = [
    {
        id: 'photo-1',
        title: 'Sesión Odontólogas',
        image: 'assets/images/Sesión odonto/Odonto_session-35.jpg',
        category: 'Retrato',
        description: 'Sesión fotográfica profesional para odontólogas, con la finalidad de que cuenten con fotografías profesionales de su carrera. Retratos individuales y grupales con una estética limpia y profesional.',
        gallery: [
            'assets/images/Sesión odonto/Odonto_session-35.jpg',
            'assets/images/Sesión odonto/Odonto_session-3.jpg',
            'assets/images/Sesión odonto/Odonto_session-6.jpg',
            'assets/images/Sesión odonto/Odonto_session-15.jpg',
            'assets/images/Sesión odonto/Odonto_session-18.jpg',
            'assets/images/Sesión odonto/Odonto_session-21.jpg',
            'assets/images/Sesión odonto/Odonto_session-31.jpg',
            'assets/images/Sesión odonto/Odonto_session-37.jpg',
            'assets/images/Sesión odonto/Odonto_session-46.jpg',
            'assets/images/Sesión odonto/Odonto_session-53.jpg',
            'assets/images/Sesión odonto/Odonto_session-75.jpg',
            'assets/images/Sesión odonto/Odonto_session-80.jpg',
            'assets/images/Sesión odonto/Odonto_session-92.jpg',
        ],
    },
    {
        id: 'photo-2',
        title: 'The True Honey',
        image: 'assets/images/true honey/true honey 1.jpg',
        category: 'Fotografía de Producto',
        description: 'Fotografías de producto con la finalidad de comunicar la marca: natural, orgánica, hogareña y mexicana, pero moderna y saludable.',
        gallery: [
            'assets/images/true honey/true honey 1.jpg',
            'assets/images/true honey/true honey 2.png',
            'assets/images/true honey/true honey 3.png',
            'assets/images/true honey/true honey 4.jpg',
            'assets/images/true honey/true honey 5.jpg',
            'assets/images/true honey/true honey 6.jpg'
        ]
    },
    {
        id: 'photo-3',
        title: 'Concierto en la Feria de la Naranja',
        image: 'assets/images/Concierto/concieirto-14_8_11zon.jpg',
        category: 'Social',
        description: 'Cobertura fotográfica de un concierto durante la Feria de la Naranja en Montemorelos, N.L.',
        gallery: [
            'assets/images/Concierto/concieirto-1_1_11zon.jpg',
            'assets/images/Concierto/concieirto-2_2_11zon.jpg',
            'assets/images/Concierto/concieirto-4_3_11zon.jpg',
            'assets/images/Concierto/concieirto-7_4_11zon.jpg',
            'assets/images/Concierto/concieirto-8_5_11zon.jpg',
            'assets/images/Concierto/concieirto-10_6_11zon.jpg',
            'assets/images/Concierto/concieirto-11_7_11zon.jpg',
            'assets/images/Concierto/concieirto-14_8_11zon.jpg',
            'assets/images/Concierto/concieirto-16_9_11zon.jpg',
            'assets/images/Concierto/concieirto-17_10_11zon.jpg',
            'assets/images/Concierto/w_11_11zon.jpg',
            'assets/images/Concierto/x_12_11zon.jpg',
            'assets/images/Concierto/xx_13_11zon.jpg',
            'assets/images/Concierto/xxxxxx.jpg',
            'assets/images/Concierto/xzx.jpg',
            'assets/images/Concierto/xzxx.jpg',
            'assets/images/Concierto/z.jpg',
            'assets/images/Concierto/zx.jpg',
            'assets/images/Concierto/zxz.jpg',
            'assets/images/Concierto/zzzz.jpg'
        ]
    },
    {
        id: 'photo-4',
        title: 'Proyecto de Luis',
        image: 'assets/images/Luis/Luis birthday-46.jpg',
        category: 'Retrato',
        description: 'Sesión de retratos fotográficos en exterior para Luis.',
        gallery: [
            'assets/images/Luis/Luis birthday-4.jpg',
            'assets/images/Luis/Luis birthday-16.jpg',
            'assets/images/Luis/Luis birthday-20.jpg',
            'assets/images/Luis/Luis birthday-23.jpg',
            'assets/images/Luis/Luis birthday-28.jpg',
            'assets/images/Luis/Luis birthday-42.jpg',
            'assets/images/Luis/Luis birthday-43.jpg',
            'assets/images/Luis/Luis birthday-44.jpg',
            'assets/images/Luis/Luis birthday-46.jpg'
        ]
    },
    {
        id: 'photo-5',
        title: 'Fotografía para Documentos',
        image: 'assets/images/Documentos/portada.png',
        category: 'Estudio',
        description: 'Fotografías de estudio que cumplen con todos los requisitos técnicos y normativos para trámites y documentos oficiales: fondo adecuado, iluminación uniforme, encuadre preciso y nitidez profesional.',
        gallery: [
            'assets/images/Documentos/portada.png',
            'assets/images/Documentos/1.png',
            'assets/images/Documentos/2.png',
            'assets/images/Documentos/3.png',
            'assets/images/Documentos/4.png'
        ]
    },
    {
        id: 'photo-6',
        title: 'Prometo No Olvidar',
        image: 'assets/images/Prometo no olvidar/4-3E4A2272.jpg',
        category: 'Editorial',
        description: 'Sesión artística y editorial que expresa la melancolía y la necesidad de aferrarse a los recuerdos y experiencias pasadas. Una exploración visual del duelo, la memoria y el tiempo.',
        gallery: [
            'assets/images/Prometo no olvidar/4-3E4A2272.jpg',
            'assets/images/Prometo no olvidar/1-3E4A2115.jpg',
            'assets/images/Prometo no olvidar/2-3E4A2187.jpg',
            'assets/images/Prometo no olvidar/3-3E4A2222.jpg',
            'assets/images/Prometo no olvidar/5-3E4A2320.jpg',
            'assets/images/Prometo no olvidar/6-3E4A2455.jpg',
            'assets/images/Prometo no olvidar/7-3E4A2539.jpg',
            'assets/images/Prometo no olvidar/8-3E4A2710.jpg',
            'assets/images/Prometo no olvidar/9-3E4A2794.jpg',
            'assets/images/Prometo no olvidar/10-3E4A2810.jpg',
            'assets/images/Prometo no olvidar/3E4A2827-Edit.jpg',
            'assets/images/Prometo no olvidar/11-3E4A2881-Edit-Edit.jpg',
            'assets/images/Prometo no olvidar/12-3E4A2895.jpg',
            'assets/images/Prometo no olvidar/13-3E4A2977-Edit.jpg',
            'assets/images/Prometo no olvidar/14-3E4A3011-Edit-Edit.jpg',
        ],
    },
];

const designData = [
    {
        id: 'design-villas',
        title: 'Villas',
        image: 'assets/images/Villas/Villas portada.png',
        category: 'Identidad de Marca',
        description: 'Unificación de la identidad institucional de Villas y diseño de línea gráfica corporativa. Incluye estandarización para departamentos internos, papelería y la campaña visual de agradecimiento para la alianza estratégica con Innova Sport.',
        type: 'design-showcase',
        cover: 'assets/images/Villas/Villas portada.png',
        carousel: [
            'assets/images/Villas/villas carrusel 1.png',
            'assets/images/Villas/villas carrusel 2.png',
            'assets/images/Villas/villas carrusel 3.png',
            'assets/images/Villas/villas carrusel 4.png',
            'assets/images/Villas/villas carrusel 5.png',
            'assets/images/Villas/villas carrusel 6.png',
            'assets/images/Villas/villas carrusel 7.png',
        ],
        elements: [
            'assets/images/Villas/viLLAS ELEMENTOS 1.png',
            'assets/images/Villas/vILLAS ELEMENTOS 2.png',
            'assets/images/Villas/Villas Tríptico.png',
            'assets/images/Villas/viillas papelera.png',
            'assets/images/Villas/villas papelera 2.png',
        ],
        longDescription: 'Rediseño e unificación de la identidad visual de Villas para consolidar una presencia de marca coherente y profesional. El proyecto abarcó desde el desarrollo de la paleta de colores, tipografía y elementos gráficos institucionales, hasta la estandarización de la papelería corporativa y manuales visuales para sus distintos departamentos.<br><br>Además, se conceptualizó y diseñó la campaña gráfica de agradecimiento para su alianza con Innova Sport, asegurando que cada pieza comunicara eficazmente los valores de la organización y reforzara el posicionamiento de la marca ante sus socios estratégicos.',
    },
    {
        id: 'design-1',
        title: 'Manual de Marca',
        image: 'assets/images/Fernando/Portada.png',
        category: 'Branding',
        description: 'Creación del manual de identidad visual para la marca de asesoría de Fernando. Un proyecto enfocado en conectar el valor de sus raíces con un diseño moderno, fresco y actualizado para proyectar una imagen sólida y coherente.',
        type: 'design-showcase',
        cover: 'assets/images/Fernando/Portada.png',
        carousel: [
            'assets/images/Fernando/Carrusel 1.png',
            'assets/images/Fernando/Carrusel 2.png',
            'assets/images/Fernando/Carrusel 3.png',
            'assets/images/Fernando/Carrusel 4.png',
            'assets/images/Fernando/Carrusel 5.png',
        ],
        elements: [
            'assets/images/Fernando/1.png',
            'assets/images/Fernando/2.png',
            [
                'assets/images/Fernando/3.1.png',
                'assets/images/Fernando/3.2.png'
            ],
            'assets/images/Fernando/Mockup 1.png',
            'assets/images/Fernando/Mockup 2.png',
            'assets/images/Fernando/Mockup 3.png',
        ],
    },
    {
        id: 'design-2',
        title: 'Sima',
        image: 'assets/images/Sima/Animación Sima.mp4',
        category: 'Diseño Web',
        description: 'Rediseño colaborativo de la interfaz UI/UX y creación de wireframes para SIMA, el software médico del Hospital La Carlota. Un enfoque centrado en optimizar la gestión médica y mejorar la experiencia de servicio de los pacientes.',
        type: 'design-showcase',
        cover: '',
        carousel: [],
        elements: [
            'assets/images/Sima/carteles_1.png',
            'assets/images/Sima/carteles_2.png',
            [
                'assets/images/Sima/Animación Sima.mp4',
                'assets/images/Sima/Laptop_2.png'
            ]
        ],
        longDescription: 'Desarrollo colaborativo de la estructura de interfaz (wireframes) para la renovación de SIMA, la plataforma y software médico en línea del Hospital La Carlota. El proyecto consistió en un rediseño integral centrado en las personas (User-Centered Design), enfocado en resolver las necesidades operativas de los médicos y optimizar la experiencia digital de los pacientes.<br><br>A través de la arquitectura de información y la simplificación de flujos de navegación, se sentaron las bases para una plataforma intuitiva y eficiente, orientada a agilizar los procesos médicos y elevar la calidad de la atención al usuario final.'
    },
    {
        id: 'design-3',
        title: 'Little Friends Vet',
        image: 'assets/images/Gemini_Generated_Image_oxagoaoxagoaoxag.jpg',
        category: 'Social Media',
        description: 'Homogeneización de la imagen corporativa en redes sociales y unificación de línea gráfica para Little Friends vet, abarcando desde la estandarización visual hasta el desarrollo de contenido digital.',
        type: 'design-showcase',
        cover: '',
        carousel: [],
        elements: [
            'assets/images/little frients vet.png'
        ],
        longDescription: 'Proyecto de homogeneización de marca y estrategia de comunicación visual para las redes sociales de la clínica veterinaria Little Friends Vet. El trabajo se enfocó en consolidar la coherencia visual del centro veterinario a través de la unificación de sus líneas gráficas y la estandarización de sus activos digitales.<br><br>Se desarrollaron plantillas, elementos gráficos personalizados y un plan de creación de contenido enfocado en transmitir una imagen sólida, confiable y cercana. Esto permitió alinear la narrativa visual de la veterinaria en sus canales digitales.'
    },
    {
        id: 'design-4',
        title: 'Biblia 5D',
        image: 'assets/images/BIBLIA 5D Trailer.mp4',
        category: 'Creación de identidad',
        description: 'Creación del logotipo y desarrollo del sistema gráfico para el programa de TV "5D". Incluye ilustración de personajes y recursos visuales destinados a la producción en pantalla y transmisión para Hope Channel y SETAI.',
        type: 'design-showcase',
        cover: 'assets/images/BIBLIA 5D Trailer.mp4',
        carousel: [],
        elements: [
            'assets/images/biblia 5d.png'
        ],
        longDescription: 'Desarrollo de la identidad gráfica y universo visual para el programa de televisión 5D, producido en colaboración para Hope Channel y SETAI. El proyecto abarcó desde el diseño del logotipo principal del programa hasta la creación de un paquete completo de recursos gráficos, ilustraciones de personajes y elementos dinámicos pensados específicamente para enriquecer la producción audiovisual y la escenografía del show.<br><br>El objetivo principal fue construir una estética atractiva, cercana y coherente con el formato televisivo, proporcionando al equipo de producción las herramientas visuales necesarias para adaptar el contenido tanto en pantalla como en medios digitales.'
    },
    {
        id: 'design-5',
        title: 'Animación tipográfica',
        image: 'assets/images/Comp 1_2.mp4',
        category: 'Motion Graphics',
        description: 'Animación en motion graphics de kinetic typography (lyrics animados) sobre un comercial existente de Nike, sincronizando texto y ritmo para potenciar la narrativa y el impacto visual del video.',
        type: 'design-showcase',
        cover: 'assets/images/Comp 1_2.mp4',
        carousel: [],
        elements: [],
        longDescription: 'Desarrollo de animación tipográfica y motion graphics aplicados sobre un video publicitario existente de la marca Nike. El proyecto consistió en la sincronización precisa de kinetic typography (lyrics animados) sobre la pista de audio original del comercial, integrando el texto de forma orgánica con el ritmo, la dinamismo y el estilo visual característico de la marca.<br><br>El objetivo principal fue potenciar el impacto visual de la pieza publicitaria, reforzando el mensaje del audio a través de transiciones fluidas, tipografía expresiva y efectos gráficos que acompañan la energía de las imágenes.'
    }
];

/* ---------- RENDER HELPERS ---------- */

/**
 * Helper to generate the correct HTML tag (img, video, or iframe for YouTube).
 */
function createMediaHTML(src, altText = '', className = '', isCover = false) {
    if (!src) return '';
    const lowerSrc = src.toLowerCase();

    // YouTube support
    if (lowerSrc.includes('youtube.com/') || lowerSrc.includes('youtu.be/')) {
        let videoId = '';
        if (lowerSrc.includes('youtube.com/watch?v=')) {
            videoId = src.split('v=')[1].split('&')[0];
        } else if (lowerSrc.includes('youtu.be/')) {
            videoId = src.split('youtu.be/')[1].split('?')[0];
        } else if (lowerSrc.includes('youtube.com/embed/')) {
            videoId = src.split('embed/')[1].split('?')[0];
        }

        if (videoId) {
            // Añadimos autoplay=1&mute=1 y evitamos el error 153 usando youtube-nocookie y referrerpolicy
            return `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&amp;mute=1" class="${className}" style="width:100%; aspect-ratio:16/9; border:none; border-radius: var(--radius-md); ${isCover ? 'pointer-events: none;' : ''}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        }
    }

    // MP4 Video support
    if (lowerSrc.endsWith('.mp4')) {
        if (isCover) {
            // En la miniatura de afuera: sin controles, en silencio para que funcione el autoplay
            return `<video src="${src}" class="${className}" autoplay loop muted playsinline style="object-fit: cover; pointer-events: none;"></video>`;
        } else {
            // Dentro del proyecto: con controles y con audio
            return `<video src="${src}" class="${className}" autoplay loop controls playsinline></video>`;
        }
    }

    // Default to Image
    return `<img src="${src}" alt="${altText}" class="${className}" loading="lazy">`;
}

/**
 * Builds a single gallery item card and returns the DOM element.
 */
function createGalleryItem(item, index) {
    const article = document.createElement('article');
    article.className = 'gallery-item fade-in visible';
    article.style.animationDelay = `${index * 0.08}s`;

    const hasGallery = item.gallery && item.gallery.length > 1;
    const isDesignShowcase = item.type === 'design-showcase';

    const mediaHTML = createMediaHTML(item.image, item.title, 'gallery-img', true);

    article.innerHTML = `
        <div class="gallery-img-wrapper">
            ${mediaHTML}
            <div class="gallery-overlay">
                <span class="gallery-category">${item.category}</span>
                <h3 class="gallery-title">${item.title}</h3>
                ${isDesignShowcase ? `<span class="gallery-count"><i class="fa-solid fa-layer-group"></i> Ver proyecto</span>` : ''}
                ${(!isDesignShowcase && hasGallery) ? `<span class="gallery-count"><i class="fa-solid fa-images"></i> ${item.gallery.length}</span>` : ''}
                <button class="gallery-expand-btn" data-id="${item.id}" aria-label="Ver imagen">
                    <i class="fa-solid fa-expand"></i>
                </button>
            </div>
        </div>
    `;

    const expandBtn = article.querySelector('.gallery-expand-btn');

    if (isDesignShowcase) {
        expandBtn.addEventListener('click', () => openDesignModal(item));
        article.querySelector('.gallery-img-wrapper').addEventListener('click', (e) => {
            if (e.target.closest('.gallery-expand-btn')) return;
            openDesignModal(item);
        });
    } else {
        // Lightbox click handler
        expandBtn.addEventListener('click', () => openLightbox(item));

        // Also open on image click
        article.querySelector('.gallery-img-wrapper').addEventListener('click', (e) => {
            if (e.target.closest('.gallery-expand-btn')) return;
            openLightbox(item);
        });
    }

    return article;
}

/* ---------- DESIGN SHOWCASE MODAL (Villas) ---------- */

/**
 * Opens the project modal with a special layout for design showcase items:
 * - Cover image (full width)
 * - Horizontal drag-scroll carousel (same-height photos, side by side)
 * - Elements stacked vertically in order
 */
function openDesignModal(item) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    // Hide project nav arrows for design showcase
    const prevProjectBtn = document.getElementById('modal-project-prev');
    const nextProjectBtn = document.getElementById('modal-project-next');
    if (prevProjectBtn) prevProjectBtn.style.display = 'none';
    if (nextProjectBtn) nextProjectBtn.style.display = 'none';

    // --- Info header ---
    let html = `
        <div class="design-modal-info">
            <span class="gallery-category">${item.category}</span>
            <h3 class="modal-title">${item.title}</h3>
            ${item.description ? `<p class="modal-description">${item.description}</p>` : ''}
        </div>
    `;

    // --- Portada ---
    if (item.cover) {
        html += `
            <div class="design-modal-cover">
                ${createMediaHTML(item.cover, `Portada ${item.title}`, 'design-element-img')}
            </div>
        `;
    }

    // --- Carrusel horizontal ---
    if (item.carousel && item.carousel.length > 0) {
        html += `
            <div class="design-carousel-section">
                <p class="design-carousel-label">Mockups y diapositivas</p>
                <div class="design-carousel-track-wrapper" id="design-carousel-wrapper">
                    <div class="design-carousel-track">
                        ${item.carousel.map((src, i) => {
            return `
                                <div class="design-carousel-item">
                                    ${createMediaHTML(src, `${item.title} ${i + 1}`, '')}
                                </div>
                            `;
        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // --- Elementos (en orden numérico, completos) ---
    if (item.elements && item.elements.length > 0) {
        html += `
            <div class="design-elements-section">
                <p class="design-elements-label">Elementos</p>
                <div class="design-elements-list">
                    ${item.elements.map((src, i) => {
            if (Array.isArray(src)) {
                return `
                    <div class="design-elements-row">
                        ${src.map((s, j) => {
                    return createMediaHTML(s, `Elemento ${i + 1}.${j + 1} — ${item.title}`, 'design-element-img');
                }).join('')}
                    </div>
                `;
            } else {
                let extraHtml = '';
                if (src.includes('Villas Tríptico.png')) {
                    extraHtml = '<p class="design-elements-label" style="margin-top: 1.5rem;">Ejemplos de rediseño de papelería</p>';
                }
                return `${extraHtml}${createMediaHTML(src, `Elemento ${i + 1} — ${item.title}`, 'design-element-img')}`;
            }
        }).join('')}
                </div>
            </div>
        `;
    }

    // --- Descripción final (Pie de página del proyecto) ---
    if (item.longDescription) {
        html += `
            <div class="design-modal-footer">
                <p>${item.longDescription}</p>
            </div>
        `;
    }

    modalBody.innerHTML = html;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // --- Configuración de Zoom simple para imágenes de carrusel ---
    const carouselMedia = modalBody.querySelectorAll('.design-carousel-item img, .design-carousel-item video');
    carouselMedia.forEach(media => {
        if (media.tagName.toLowerCase() === 'iframe') return;
        media.style.cursor = 'pointer';
        media.addEventListener('click', (e) => {
            e.stopPropagation();
            openZoomOverlay(media.src);
        });
    });

    // --- Drag-to-scroll on carousel ---
    const wrapper = document.getElementById('design-carousel-wrapper');
    if (wrapper) {
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        wrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
            wrapper.style.cursor = 'grabbing';
        });
        wrapper.addEventListener('mouseleave', () => {
            isDragging = false;
            wrapper.style.cursor = 'grab';
        });
        wrapper.addEventListener('mouseup', () => {
            isDragging = false;
            wrapper.style.cursor = 'grab';
        });
        wrapper.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 1.5;
            wrapper.scrollLeft = scrollLeft - walk;
        });
    }
}

/**
 * Renders a list of items into a target grid element.
 */
function renderGallery(items, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-image" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>Próximamente...</p>
            </div>
        `;
        return;
    }

    items.forEach((item, i) => {
        grid.appendChild(createGalleryItem(item, i));
    });
}

/* ---------- LIGHTBOX (fixed frame + thumbnail strip + description) ---------- */

let currentLightboxGallery = [];
let currentLightboxIndex = 0;
let currentLightboxItem = null;

function openLightbox(item, direction = null) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    currentLightboxItem = item;

    // Build gallery array
    if (item.gallery && item.gallery.length > 1) {
        currentLightboxGallery = item.gallery;
    } else {
        currentLightboxGallery = [item.image];
    }
    currentLightboxIndex = 0;

    // Determine which array this item belongs to and what its index is
    let currentArray = photographyData;
    let projectIndex = photographyData.findIndex(p => p.id === item.id);
    if (projectIndex === -1) {
        currentArray = designData;
        projectIndex = designData.findIndex(p => p.id === item.id);
    }

    const hasMultiple = currentLightboxGallery.length > 1;

    // Build modal HTML
    let html = `
        <div class="modal-gallery-container">
            ${hasMultiple ? `
                <button class="modal-nav-btn modal-prev-btn" id="modal-prev" aria-label="Anterior">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
            ` : ''}
            <div class="modal-image-frame">
                <img src="${currentLightboxGallery[0]}" alt="${item.title}" id="modal-gallery-image">
            </div>
            ${hasMultiple ? `
                <button class="modal-nav-btn modal-next-btn" id="modal-next" aria-label="Siguiente">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            ` : ''}
        </div>
    `;

    // Thumbnail strip (only for multi-photo galleries)
    if (hasMultiple) {
        html += `<div class="modal-thumbs-strip" id="modal-thumbs">`;
        currentLightboxGallery.forEach((src, i) => {
            html += `
                <div class="modal-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
                    <img src="${src}" alt="Foto ${i + 1}" loading="lazy">
                </div>
            `;
        });
        html += `</div>`;
    }

    // Info + counter + description
    html += `
        <div class="modal-info" style="text-align: center;">
            <span class="gallery-category" style="position: static; display: inline-block; margin-bottom: 0.5rem; color: var(--primary);">${item.category}</span>
            <h3 class="modal-title">${item.title}</h3>
            ${hasMultiple ? `
                <span class="modal-counter" id="modal-counter" style="display:inline-block; margin-top:0.5rem; font-size:0.85rem; color:var(--text-muted);">
                    1 / ${currentLightboxGallery.length}
                </span>
            ` : ''}
        </div>
    `;

    // Description
    if (item.description) {
        html += `
            <div class="modal-project-description">
                <p>${item.description}</p>
            </div>
        `;
    }

    // Project navigation buttons outside the frame
    const prevProjectBtn = document.getElementById('modal-project-prev');
    const nextProjectBtn = document.getElementById('modal-project-next');

    if (currentArray && projectIndex !== -1 && currentArray.length > 1) {
        const prevProjectIndex = (projectIndex - 1 + currentArray.length) % currentArray.length;
        const nextProjectIndex = (projectIndex + 1) % currentArray.length;

        if (prevProjectBtn) {
            prevProjectBtn.style.display = 'flex';
            prevProjectBtn.onclick = (e) => {
                e.stopPropagation();
                openLightbox(currentArray[prevProjectIndex], 'prev');
            };
        }
        if (nextProjectBtn) {
            nextProjectBtn.style.display = 'flex';
            nextProjectBtn.onclick = (e) => {
                e.stopPropagation();
                openLightbox(currentArray[nextProjectIndex], 'next');
            };
        }
    } else {
        if (prevProjectBtn) prevProjectBtn.style.display = 'none';
        if (nextProjectBtn) nextProjectBtn.style.display = 'none';
    }

    const renderContent = () => {
        modalBody.innerHTML = html;

        // Attach nav listeners
        if (hasMultiple) {
            document.getElementById('modal-prev').addEventListener('click', (e) => {
                e.stopPropagation();
                navigateModalGallery(-1);
            });
            document.getElementById('modal-next').addEventListener('click', (e) => {
                e.stopPropagation();
                navigateModalGallery(1);
            });

            // Thumbnail click listeners
            document.querySelectorAll('.modal-thumb').forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = parseInt(thumb.dataset.index);
                    goToModalPhoto(idx);
                });
            });
        }

        // Zoom functionality
        const imageFrame = document.querySelector('.modal-image-frame');
        const galleryImage = document.getElementById('modal-gallery-image');

        if (imageFrame && galleryImage) {
            imageFrame.addEventListener('click', (e) => {
                e.stopPropagation();
                imageFrame.classList.toggle('is-zoomed');
                if (!imageFrame.classList.contains('is-zoomed')) {
                    galleryImage.style.transformOrigin = 'center center';
                } else {
                    const rect = imageFrame.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    galleryImage.style.transformOrigin = `${x}% ${y}%`;
                }
            });

            imageFrame.addEventListener('mousemove', (e) => {
                if (imageFrame.classList.contains('is-zoomed')) {
                    const rect = imageFrame.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    galleryImage.style.transformOrigin = `${x}% ${y}%`;
                }
            });

            imageFrame.addEventListener('mouseleave', () => {
                if (imageFrame.classList.contains('is-zoomed')) {
                    imageFrame.classList.remove('is-zoomed');
                    galleryImage.style.transformOrigin = 'center center';
                }
            });
        }
    };

    // Apply animations if modal is already open and navigating between projects
    if (modal.classList.contains('active') && direction) {
        const outClass = direction === 'next' ? 'swipe-out-left' : 'swipe-out-right';
        const inClass = direction === 'next' ? 'swipe-in-right' : 'swipe-in-left';

        modalBody.classList.remove('swipe-out-left', 'swipe-out-right', 'swipe-in-left', 'swipe-in-right');
        modalBody.classList.add(outClass);

        setTimeout(() => {
            renderContent();
            modalBody.classList.remove(outClass);
            modalBody.classList.add(inClass);

            setTimeout(() => {
                modalBody.classList.remove(inClass);
            }, 300); // 300ms matches the CSS animation duration
        }, 300);
    } else {
        renderContent();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}



function navigateModalGallery(direction) {
    let newIndex = currentLightboxIndex + direction;
    if (newIndex < 0) newIndex = currentLightboxGallery.length - 1;
    if (newIndex >= currentLightboxGallery.length) newIndex = 0;
    goToModalPhoto(newIndex);
}

function goToModalPhoto(index) {
    currentLightboxIndex = index;

    const img = document.getElementById('modal-gallery-image');
    const counter = document.getElementById('modal-counter');

    if (img) {
        // Smooth transition and zoom reset
        const imageFrame = img.closest('.modal-image-frame');
        if (imageFrame) {
            imageFrame.classList.remove('is-zoomed');
            img.style.transformOrigin = 'center center';
        }

        img.style.opacity = '0';
        img.style.transform = 'scale(0.97)';
        setTimeout(() => {
            img.src = currentLightboxGallery[currentLightboxIndex];
            img.style.opacity = '1';
            img.style.transform = ''; // Clear inline style so CSS classes take over
        }, 120);
    }

    if (counter) {
        counter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxGallery.length}`;
    }

    // Update active thumbnail
    document.querySelectorAll('.modal-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentLightboxIndex);
    });

    // Scroll active thumbnail into view
    const activeThumb = document.querySelector('.modal-thumb.active');
    if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// Keyboard navigation for modal gallery
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('project-modal');
    if (!modal || !modal.classList.contains('active')) return;

    if (currentLightboxGallery.length > 1) {
        if (e.key === 'ArrowLeft') navigateModalGallery(-1);
        if (e.key === 'ArrowRight') navigateModalGallery(1);
    }
});

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    // Hide project nav buttons
    const prevProjectBtn = document.getElementById('modal-project-prev');
    const nextProjectBtn = document.getElementById('modal-project-next');
    if (prevProjectBtn) prevProjectBtn.style.display = 'none';
    if (nextProjectBtn) nextProjectBtn.style.display = 'none';

    currentLightboxGallery = [];
    currentLightboxIndex = 0;
    currentLightboxItem = null;
}

/* ---------- INIT ---------- */

function renderProjects() {
    renderGallery(photographyData, 'photography-grid');
    renderGallery(designData, 'design-grid');
}

/* ---------- OVERLAY PARA ZOOM DE IMÁGENES DE DISEÑO ---------- */
function openZoomOverlay(src) {
    if (!src || src.includes('youtube.com') || src.includes('youtu.be')) return; // No zoom for youtube videos

    const overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    // Estilos en línea para evitar problemas de caché CSS
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    overlay.style.zIndex = '99999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.cursor = 'pointer';

    const isVideo = src.toLowerCase().endsWith('.mp4');
    let media;

    if (isVideo) {
        media = document.createElement('video');
        media.src = src;
        media.autoplay = true;
        media.loop = true;
        media.muted = true;
        media.playsInline = true;
    } else {
        media = document.createElement('img');
        media.src = src;
    }

    media.className = 'zoom-overlay-img';
    media.style.maxWidth = '90vw';
    media.style.maxHeight = '90vh';
    media.style.objectFit = 'contain';

    overlay.appendChild(media);
    document.body.appendChild(overlay);

    // Cierra el overlay con cualquier clic
    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}
