/* ==========================================================================
   PORTAFOLIO DE RENÉ SAITO - MANEJADOR PRINCIPAL DE INTERACTIVIDAD (MAIN.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeaderScroll();
    initMobileNav();
    initScrollSpy();
    initScrollAnimations();
    initModalEvents();
    initContactForm();
    initCvButton();
    initHeroParallax();
    initScrollTopBtn();
    initBlobParallax();

    // Renderizar galerías de fotografía y diseño
    renderProjects();
});

/* 1. MODO OSCURO / CLARO
   ========================================================================== */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('saito-portfolio-theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('saito-portfolio-theme', newTheme);

            showToast(`Modo ${newTheme === 'dark' ? 'Oscuro' : 'Claro'} activado`, 'success');
        });
    }
}

/* 2. HEADER SCROLLED STATE
   ========================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* 3. MENÚ NAVEGACIÓN MÓVIL
   ========================================================================== */
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => closeMenu());
        });

        // Cerrar menú al hacer clic en el overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', () => closeMenu());
        }

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target) &&
                e.target !== navOverlay) {
                closeMenu();
            }
        });
    }
}

/* 4. SCROLL SPY (INDICADOR DE SECCIÓN ACTIVA EN NAV)
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* 5. ANIMACIONES AL SCROLL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/* 6. EVENTOS DE CERRAR MODAL
   ========================================================================== */
function initModalEvents() {
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

/* 8. MANEJO DE FORMULARIO DE CONTACTO
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>Enviando...</span>
        `;

        const data = new FormData(e.target);

        try {
            const response = await fetch(e.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                showToast('¡Mensaje enviado con éxito! Me pondré en contacto pronto.', 'success');
            } else {
                showToast('Hubo un problema al enviar tu mensaje. Intenta de nuevo.', 'error');
            }
        } catch (error) {
            showToast('Ocurrió un error de red. Intenta de nuevo.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

/* 9. BOTÓN DESCARGA DE CV
   ========================================================================== */
function initCvButton() {
    const cvBtn = document.getElementById('cv-btn');
    if (cvBtn) {
        cvBtn.addEventListener('click', () => {
            showToast('Descargando Currículum Vitae...', 'success');
        });
    }
}

/* 10. HELPER NOTIFICACIONES TOAST
   ========================================================================== */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto eliminar tras 4 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

/* 11. HERO PARALLAX EFFECT
   ========================================================================== */
function initHeroParallax() {
    const heroPhoto = document.getElementById('hero-photo');
    const heroDesc = document.getElementById('hero-description');
    if (!heroPhoto && !heroDesc) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                const heroSection = document.getElementById('hero');
                if (!heroSection) return;

                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

                // Only apply parallax while hero is visible AND on wider screens
                // Below 992px the elements are in normal flow, so parallax transform breaks layout
                if (scrollY < heroBottom && window.innerWidth > 992) {
                    const photoOffset = scrollY * 0.3;
                    const descOffset = scrollY * 0.15;

                    if (heroPhoto) {
                        heroPhoto.style.transform = `translate(-50%, calc(-50% - ${photoOffset}px))`;
                    }
                    if (heroDesc) {
                        heroDesc.style.transform = `translateY(-${descOffset}px)`;
                    }
                } else if (window.innerWidth <= 992) {
                    if (heroPhoto) heroPhoto.style.transform = '';
                    if (heroDesc) heroDesc.style.transform = '';
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}

/* 12. BOTÓN VOLVER AL HERO (SCROLL TO TOP)
   ========================================================================== */
function initScrollTopBtn() {
    const btn = document.getElementById('scroll-top-btn');
    const heroSection = document.getElementById('hero');
    if (!btn || !heroSection) return;

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
/* 13. PARALLAX DE BLOBS DE FONDO — Movimientos reactivos al scroll
   ========================================================================== */
function initBlobParallax() {
    const blobs = [
        {
            el: document.querySelector('.blob-1'),
            // Blob 1: se va hacia abajo-derecha y encoge
            xFactor:     0.06,   // desplazamiento X por px de scroll
            yFactor:     0.14,   // desplazamiento Y por px de scroll
            scaleBase:   1.0,
            scaleFactor: -0.00015, // encoge al bajar (negativo)
            current: { x: 0, y: 0, scale: 1 },
            target:  { x: 0, y: 0, scale: 1 },
        },
        {
            el: document.querySelector('.blob-2'),
            // Blob 2: se va hacia arriba-izquierda y crece
            xFactor:    -0.09,
            yFactor:    -0.18,
            scaleBase:   1.0,
            scaleFactor:  0.0002,  // crece al bajar (positivo)
            current: { x: 0, y: 0, scale: 1 },
            target:  { x: 0, y: 0, scale: 1 },
        },
        {
            el: document.querySelector('.blob-3'),
            // Blob 3: diagonal y pulsa
            xFactor:     0.12,
            yFactor:     0.08,
            scaleBase:   1.0,
            scaleFactor: -0.0001,
            current: { x: 0, y: 0, scale: 1 },
            target:  { x: 0, y: 0, scale: 1 },
        },
    ].filter(b => b.el); // ignora blobs que no existan en el DOM

    if (blobs.length === 0) return;

    const LERP = 0.07; // factor de suavizado (0 = sin movimiento, 1 = instantáneo)
    let scrollY  = 0;
    let rafId    = null;

    // Actualizar targets en scroll (sin cálculos pesados aquí)
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    }, { passive: true });

    // Loop de animación independiente del evento scroll
    function tick() {
        blobs.forEach(blob => {
            // Calcular targets según scroll actual
            blob.target.x     = scrollY * blob.xFactor;
            blob.target.y     = scrollY * blob.yFactor;
            blob.target.scale = blob.scaleBase + scrollY * blob.scaleFactor;

            // Clamp de escala para que no desaparezca ni crezca demasiado
            blob.target.scale = Math.max(0.4, Math.min(2.0, blob.target.scale));

            // Interpolar suavemente hacia el target (lerp)
            blob.current.x     += (blob.target.x     - blob.current.x)     * LERP;
            blob.current.y     += (blob.target.y     - blob.current.y)     * LERP;
            blob.current.scale += (blob.target.scale - blob.current.scale) * LERP;

            // Aplicar con propiedades CSS individuales (no colisionan con animation en `transform`)
            blob.el.style.translate = `${blob.current.x.toFixed(2)}px ${blob.current.y.toFixed(2)}px`;
            blob.el.style.scale     = blob.current.scale.toFixed(4);
        });

        rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
}
