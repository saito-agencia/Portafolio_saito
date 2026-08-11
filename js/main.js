/* ==========================================================================
   PORTAFOLIO DE RENÉ SAITO - MANEJADOR PRINCIPAL DE INTERACTIVIDAD (MAIN.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeaderScroll();
    initMobileNav();
    initScrollSpy();
    initScrollAnimations();
    initPortfolioFilters();
    initModalEvents();
    initContactForm();
    initCvButton();
    initHeroParallax();

    // Renderizar proyectos por defecto
    renderProjects('all');
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
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
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

/* 6. FILTROS DE PORTAFOLIO
   ========================================================================== */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cambiar clase activa
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Renderizar proyectos por categoría
            const category = btn.getAttribute('data-filter');
            renderProjects(category);
        });
    });
}

/* 7. EVENTOS DE CERRAR MODAL
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>Enviando...</span>
        `;

        // Simulación de envío exitoso tras 1.5 segundos
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            showToast('¡Mensaje enviado con éxito! Me pondré en contacto pronto.', 'success');
            form.reset();
        }, 1500);
    });
}

/* 9. BOTÓN DESCARGA DE CV
   ========================================================================== */
function initCvButton() {
    const cvBtn = document.getElementById('cv-btn');
    if (cvBtn) {
        cvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Iniciando descarga del Currículum Vitae (CV)...', 'success');
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
    if (!heroPhoto) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                const heroSection = document.getElementById('hero');
                if (!heroSection) return;

                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

                // Only apply parallax while hero is visible
                if (scrollY < heroBottom) {
                    const offset = scrollY * 0.3;
                    heroPhoto.style.transform = `translate(-50%, calc(-55% - ${offset}px))`;
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}
