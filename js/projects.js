/* ==========================================================================
   PORTAFOLIO DE RENÉ SAITO - BASE DE DATOS Y LÓGICA DE PROYECTOS
   ========================================================================== */

const projectsData = [
    {
        id: 1,
        title: "E-Commerce Analytics Dashboard",
        category: "fullstack",
        categoryName: "Fullstack Web App",
        image: "assets/images/project-1.png",
        description: "Plataforma analítica avanzada en tiempo real para negocios e-commerce con métricas de ventas, inventario y predicciones.",
        fullDescription: "Un sistema integral de administración y analítica en tiempo real diseñado para tiendas en línea de alto volumen. Permite a los gestores visualizar métricas de conversión, ingresos por canal y proyección de inventario mediante gráficos interactivos.",
        technologies: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Chart.js", "PostgreSQL"],
        features: [
            "Visualización de datos en tiempo real mediante WebSockets.",
            "Panel de control interactivo personalizable con arrastrar y soltar.",
            "Autenticación segura basada en JWT y roles de usuario.",
            "Exportación de reportes automatizados en formatos PDF y Excel."
        ],
        demoUrl: "https://example.com/demo-ecommerce",
        githubUrl: "https://github.com/renesaito/ecommerce-analytics"
    },
    {
        id: 2,
        title: "AI Creative Assistant App",
        category: "mobile",
        categoryName: "Aplicación Móvil",
        image: "assets/images/project-2.png",
        description: "Asistente móvil impulsado por Inteligencia Artificial para generación de contenido multimedia y edición creativa al instante.",
        fullDescription: "Aplicación móvil multiplataforma que conecta a los creadores de contenido con modelos de IA de última generación para generar imágenes, texto promocional y guiones en segundos.",
        technologies: ["React Native", "TypeScript", "OpenAI API", "FastAPI", "Tailwind", "Python"],
        features: [
            "Generación instantánea de assets visuales y copys con IA.",
            "Interfaz oscura futurista con soporte para gestos táctiles.",
            "Modo offline con sincronización en la nube.",
            "Integración de pagos in-app mediante Stripe API."
        ],
        demoUrl: "https://example.com/demo-ai-app",
        githubUrl: "https://github.com/renesaito/ai-assistant-mobile"
    },
    {
        id: 3,
        title: "Cloud Management SaaS Platform",
        category: "web",
        categoryName: "Plataforma Web SaaS",
        image: "assets/images/project-3.png",
        description: "Plataforma en la nube para orquestación de servidores, monitoreo de rendimiento y automatización de despliegues.",
        fullDescription: "Herramienta SaaS diseñada para equipos de desarrollo y DevOps que simplifica la infraestructura en la nube. Proporciona alertas tempranas, gestión de clústeres y registros centralizados en una sola interfaz limpia.",
        technologies: ["Next.js", "React", "Docker", "GraphQL", "Tailwind CSS", "AWS SDK"],
        features: [
            "Monitoreo de latencia y estado de servidores en tiempo real.",
            "Despliegues automatizados mediante Webhooks de GitHub.",
            "Gestión centralizada de variables de entorno seguras.",
            "Diseño Glassmorphism optimizado para modo oscuro."
        ],
        demoUrl: "https://example.com/demo-saas",
        githubUrl: "https://github.com/renesaito/cloud-saas-platform"
    },
    {
        id: 4,
        title: "Crypto Wallet & Fintech App",
        category: "design",
        categoryName: "Diseño UI/UX & Mobile",
        image: "assets/images/project-4.png",
        description: "Diseño y desarrollo de interfaz para billetera digital con gestión de activos cripto, transferencias y analítica financiera.",
        fullDescription: "Experiencia de usuario de última generación para aplicaciones fintech. Centrada en la seguridad accesible, la claridad visual de transacciones y un diseño minimalista de alto contraste.",
        technologies: ["Figma", "UI/UX Design", "React", "Web3.js", "Vanilla CSS"],
        features: [
            "Diseño de prototipo de alta fidelidad probado con usuarios reales.",
            "Gráficos interactivos de fluctuación de activos.",
            "Arquitectura de seguridad intuitiva (FaceID / Biometría).",
            "Guía de estilos completa y sistema de componentes reutilizables."
        ],
        demoUrl: "https://example.com/demo-fintech",
        githubUrl: "https://github.com/renesaito/crypto-wallet-ui"
    }
];

// Inicialización y Renderizado de Proyectos
function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(project => project.category === filter);

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>No se encontraron proyectos en esta categoría.</p>
            </div>
        `;
        return;
    }

    filteredProjects.forEach(project => {
        const projectCard = document.createElement('article');
        projectCard.className = 'project-card glass-card fade-in visible';

        const techTagsHtml = project.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');

        projectCard.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
                <span class="project-category-badge">${project.categoryName}</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techTagsHtml}
                </div>
                <div class="project-links">
                    <button onclick="openProjectModal(${project.id})" class="btn btn-primary btn-sm">
                        <span>Ver Detalles</span>
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </button>
                    <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" aria-label="Ver Código en GitHub">
                        <i class="fa-brands fa-github"></i>
                    </a>
                </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

// Abrir Modal de Proyecto
function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    const techTagsHtml = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');

    const featuresHtml = project.features
        .map(feature => `<li>${feature}</li>`)
        .join('');

    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="modal-image">
        <span class="project-category-badge" style="position: static; display: inline-block; margin-bottom: 0.75rem;">${project.categoryName}</span>
        <h3 class="modal-title">${project.title}</h3>
        <p class="modal-description">${project.fullDescription}</p>

        <div class="modal-features">
            <h4><i class="fa-solid fa-check-circle text-accent"></i> Características Clave</h4>
            <ul>${featuresHtml}</ul>
        </div>

        <div class="modal-tech" style="margin-bottom: 2rem;">
            <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem;"><i class="fa-solid fa-code text-accent"></i> Tecnologías Utilizadas</h4>
            <div class="project-tech">${techTagsHtml}</div>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="${project.demoUrl}" target="_blank" rel="noopener" class="btn btn-primary">
                <span>Demo en Vivo</span>
                <i class="fa-solid fa-globe"></i>
            </a>
            <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary">
                <span>Código en GitHub</span>
                <i class="fa-brands fa-github"></i>
            </a>
        </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

// Cerrar Modal
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}
