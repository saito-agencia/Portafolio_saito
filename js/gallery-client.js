/* ==========================================================================
   CLIENT GALLERY VIEW — René Saito Photography
   Vista pública que ven los clientes para ver y descargar sus fotos
   ========================================================================== */

/* ---------- STATE ---------- */
let galleryData = null;
let galleryId = null;
let allSections = [];
let currentSectionPhotos = [];
let currentSectionId = null;
let allPhotosFlat = []; // All photos across sections for lightbox navigation
let favorites = new Set();
let lightboxIndex = 0;
let isDownloading = false;

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
    initClientTheme();
    initGallery();
    initLightbox();
    initFavoritesBar();
    initDownloadAll();
});

/* ==========================================================================
   1. THEME
   ========================================================================== */
function initClientTheme() {
    const saved = localStorage.getItem('saito-portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
}

/* ==========================================================================
   2. GALLERY INITIALIZATION
   ========================================================================== */
async function initGallery() {
    // Get gallery ID from URL
    const params = new URLSearchParams(window.location.search);
    galleryId = params.get('id');

    if (!galleryId) {
        showScreen('error');
        return;
    }

    try {
        // Load gallery data
        const doc = await db.collection('galleries').doc(galleryId).get();

        if (!doc.exists || !doc.data().isActive) {
            showScreen('error');
            return;
        }

        galleryData = doc.data();
        document.title = `${galleryData.title} | René Saito Photography`;

        // Load favorites from localStorage
        loadFavorites();

        // Check password
        if (galleryData.password && galleryData.password.trim().length > 0) {
            // Check if already authenticated in this session
            const storedAuth = sessionStorage.getItem(`gallery-auth-${galleryId}`);
            if (storedAuth === 'true') {
                await loadAndRenderGallery();
            } else {
                showPasswordScreen();
            }
        } else {
            await loadAndRenderGallery();
        }
    } catch (err) {
        console.error('Error loading gallery:', err);
        showScreen('error');
    }
}

function showScreen(screen) {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('error-screen').classList.add('hidden');
    document.getElementById('password-screen').classList.add('hidden');
    document.getElementById('gallery-wrapper').classList.add('hidden');

    const el = document.getElementById(`${screen}-screen`) || document.getElementById(`${screen}`);
    if (el) el.classList.remove('hidden');
}

/* ==========================================================================
   3. PASSWORD VERIFICATION
   ========================================================================== */
function showPasswordScreen() {
    showScreen('password');

    const titleEl = document.getElementById('password-gallery-title');
    if (titleEl && galleryData) {
        titleEl.textContent = galleryData.title || 'Galería Privada';
    }

    const form = document.getElementById('password-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        verifyPassword();
    });
}

async function verifyPassword() {
    const input = document.getElementById('gallery-password-input');
    const errorEl = document.getElementById('password-error');
    const entered = input.value.trim();

    if (entered === galleryData.password) {
        // Correct password
        sessionStorage.setItem(`gallery-auth-${galleryId}`, 'true');
        errorEl.classList.remove('visible');
        await loadAndRenderGallery();
    } else {
        // Wrong password
        errorEl.classList.add('visible');
        input.value = '';
        input.focus();
    }
}

/* ==========================================================================
   4. LOAD & RENDER GALLERY
   ========================================================================== */
async function loadAndRenderGallery() {
    showScreen('loading');

    try {
        // Load all sections with their photos
        const sectionsSnap = await db.collection('galleries').doc(galleryId)
            .collection('sections')
            .orderBy('order', 'asc')
            .get();

        allSections = [];
        allPhotosFlat = [];

        for (const sectionDoc of sectionsSnap.docs) {
            const sectionData = { id: sectionDoc.id, ...sectionDoc.data(), photos: [] };

            const photosSnap = await sectionDoc.ref.collection('photos')
                .orderBy('order', 'asc')
                .get();

            photosSnap.forEach(photoDoc => {
                const photo = { id: photoDoc.id, sectionId: sectionDoc.id, ...photoDoc.data() };
                sectionData.photos.push(photo);
                allPhotosFlat.push(photo);
            });

            allSections.push(sectionData);
        }

        // Render everything
        renderCover();
        renderSectionTabs();

        // Show first section by default
        if (allSections.length > 0) {
            selectSection(allSections[0].id);
        }

        // Show gallery
        showScreen('gallery-wrapper');

    } catch (err) {
        console.error('Error rendering gallery:', err);
        showScreen('error');
    }
}

/* ==========================================================================
   5. COVER RENDERING
   ========================================================================== */
function renderCover() {
    const coverEl = document.getElementById('gallery-cover');
    if (!coverEl || !galleryData) return;

    const style = galleryData.coverStyle || 'minimal';
    const accentColor = galleryData.accentColor || '#264CC0';
    const title = galleryData.title || 'Galería';
    const date = galleryData.date
        ? new Date(galleryData.date + 'T00:00:00').toLocaleDateString('es-MX', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
        : '';
    const coverUrl = galleryData.coverPhotoUrl || '';
    const description = galleryData.description || '';

    // Set accent color CSS variable
    document.documentElement.style.setProperty('--gallery-accent', accentColor);

    coverEl.className = `gallery-cover cover-${style}`;

    let html = '';

    if (style === 'minimal') {
        html = `
            ${coverUrl ? `<img src="${coverUrl}" alt="${title}" class="cover-image">` : ''}
            <div class="cover-overlay"></div>
            <div class="cover-content">
                <h1 class="cover-title">${title}</h1>
                ${date ? `<p class="cover-date">${date}</p>` : ''}
            </div>
            <div class="scroll-indicator"><i class="fa-solid fa-chevron-down"></i></div>
        `;
    } else if (style === 'classic') {
        html = `
            ${coverUrl ? `<img src="${coverUrl}" alt="${title}" class="cover-image">` : ''}
            <div class="cover-content">
                <h1 class="cover-title">${title}</h1>
                <div class="cover-divider" style="background:${accentColor};"></div>
                ${date ? `<p class="cover-date">${date}</p>` : ''}
            </div>
            <div class="scroll-indicator"><i class="fa-solid fa-chevron-down"></i></div>
        `;
    } else if (style === 'bold') {
        html = `
            ${coverUrl ? `<img src="${coverUrl}" alt="${title}" class="cover-image">` : ''}
            <div class="cover-overlay" style="background:linear-gradient(135deg, ${accentColor}CC 0%, rgba(0,0,0,0.6) 100%);"></div>
            <div class="cover-content">
                <h1 class="cover-title">${title}</h1>
                ${description ? `<p class="cover-description">${description}</p>` : ''}
            </div>
            <div class="scroll-indicator"><i class="fa-solid fa-chevron-down"></i></div>
        `;
    }

    coverEl.innerHTML = html;

    // If no cover image, add a gradient background
    if (!coverUrl) {
        coverEl.style.background = `linear-gradient(135deg, ${accentColor} 0%, ${adjustColor(accentColor, -40)} 100%)`;
        coverEl.style.minHeight = style === 'bold' ? '80vh' : '50vh';
    }
}

/* ==========================================================================
   6. SECTION TABS
   ========================================================================== */
function renderSectionTabs() {
    const tabsEl = document.getElementById('gallery-nav-tabs');
    if (!tabsEl) return;

    tabsEl.innerHTML = '';

    // "Todas" tab
    const allTab = document.createElement('button');
    allTab.className = 'gallery-nav-tab';
    allTab.textContent = `Todas (${allPhotosFlat.length})`;
    allTab.dataset.section = 'all';
    allTab.addEventListener('click', () => selectSection('all'));
    tabsEl.appendChild(allTab);

    // Section tabs
    allSections.forEach(section => {
        const tab = document.createElement('button');
        tab.className = 'gallery-nav-tab';
        tab.textContent = `${section.name} (${section.photos.length})`;
        tab.dataset.section = section.id;
        tab.addEventListener('click', () => selectSection(section.id));
        tabsEl.appendChild(tab);
    });
}

function selectSection(sectionId) {
    currentSectionId = sectionId;

    // Update tabs
    document.querySelectorAll('.gallery-nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.section === sectionId);
    });

    // Get photos for section
    if (sectionId === 'all') {
        currentSectionPhotos = [...allPhotosFlat];
    } else {
        const section = allSections.find(s => s.id === sectionId);
        currentSectionPhotos = section ? section.photos : [];
    }

    renderPhotoGrid();
}

/* ==========================================================================
   7. PHOTO GRID
   ========================================================================== */
function renderPhotoGrid() {
    const gridEl = document.getElementById('photos-grid');
    const emptyEl = document.getElementById('photos-empty');
    if (!gridEl) return;

    if (currentSectionPhotos.length === 0) {
        gridEl.innerHTML = '';
        if (emptyEl) emptyEl.classList.remove('hidden');
        return;
    }

    if (emptyEl) emptyEl.classList.add('hidden');
    gridEl.innerHTML = '';

    currentSectionPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        item.style.animationDelay = `${Math.min(index * 0.03, 1)}s`;

        const isFav = favorites.has(photo.id);

        item.innerHTML = `
            <img src="${photo.previewUrl}" alt="${photo.fileName}" loading="lazy">
            <button class="photo-fav-btn ${isFav ? 'active' : ''}" 
                    data-photo-id="${photo.id}" 
                    title="Marcar como favorita"
                    onclick="event.stopPropagation(); toggleFavorite('${photo.id}', this)">
                <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
            </button>
        `;

        item.addEventListener('click', () => openLightbox(index));
        gridEl.appendChild(item);
    });
}

/* ==========================================================================
   8. LIGHTBOX
   ========================================================================== */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const favBtn = document.getElementById('lightbox-fav-btn');
    const downloadBtn = document.getElementById('lightbox-download-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));
    if (favBtn) favBtn.addEventListener('click', lightboxToggleFav);
    if (downloadBtn) downloadBtn.addEventListener('click', lightboxDownload);

    // Close on backdrop click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-image-container')) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') navigateLightbox(-1);
        else if (e.key === 'ArrowRight') navigateLightbox(1);
        else if (e.key === 'f' || e.key === 'F') lightboxToggleFav();
    });
}

function openLightbox(index) {
    lightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function navigateLightbox(direction) {
    lightboxIndex += direction;
    if (lightboxIndex < 0) lightboxIndex = currentSectionPhotos.length - 1;
    if (lightboxIndex >= currentSectionPhotos.length) lightboxIndex = 0;
    updateLightboxContent();
}

function updateLightboxContent() {
    const photo = currentSectionPhotos[lightboxIndex];
    if (!photo) return;

    const imgEl = document.getElementById('lightbox-image');
    const counterEl = document.getElementById('lightbox-counter');
    const favBtn = document.getElementById('lightbox-fav-btn');

    // Use preview URL for fast display (original can be very large)
    if (imgEl) imgEl.src = photo.previewUrl;
    if (counterEl) counterEl.textContent = `${lightboxIndex + 1} / ${currentSectionPhotos.length}`;

    // Update fav button
    const isFav = favorites.has(photo.id);
    if (favBtn) {
        favBtn.classList.toggle('fav-active', isFav);
        favBtn.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>`;
    }
}

function lightboxToggleFav() {
    const photo = currentSectionPhotos[lightboxIndex];
    if (!photo) return;

    toggleFavorite(photo.id);

    // Update lightbox fav button
    const favBtn = document.getElementById('lightbox-fav-btn');
    const isFav = favorites.has(photo.id);
    if (favBtn) {
        favBtn.classList.toggle('fav-active', isFav);
        favBtn.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>`;
    }

    // Update grid fav button
    const gridBtn = document.querySelector(`.photo-fav-btn[data-photo-id="${photo.id}"]`);
    if (gridBtn) {
        gridBtn.classList.toggle('active', isFav);
        gridBtn.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>`;
    }
}

async function lightboxDownload() {
    const photo = currentSectionPhotos[lightboxIndex];
    if (!photo) return;

    showClientToast('Descargando foto original...', 'success');

    try {
        const response = await fetch(photo.originalUrl);
        const blob = await response.blob();
        saveAs(blob, photo.fileName);
    } catch (err) {
        console.error('Error downloading photo:', err);
        // Fallback: open in new tab
        window.open(photo.originalUrl, '_blank');
    }
}

/* ==========================================================================
   9. FAVORITES SYSTEM
   ========================================================================== */
function toggleFavorite(photoId, btnEl) {
    if (favorites.has(photoId)) {
        favorites.delete(photoId);
    } else {
        favorites.add(photoId);
    }

    // Update button if provided
    if (btnEl) {
        const isFav = favorites.has(photoId);
        btnEl.classList.toggle('active', isFav);
        btnEl.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>`;
    }

    saveFavorites();
    updateFavoritesBar();
}

function saveFavorites() {
    if (galleryId) {
        localStorage.setItem(`gallery-favs-${galleryId}`, JSON.stringify([...favorites]));
    }
}

function loadFavorites() {
    if (galleryId) {
        const saved = localStorage.getItem(`gallery-favs-${galleryId}`);
        if (saved) {
            try {
                favorites = new Set(JSON.parse(saved));
            } catch (e) {
                favorites = new Set();
            }
        }
    }
}

function initFavoritesBar() {
    const clearBtn = document.getElementById('clear-favorites-btn');
    const downloadSelBtn = document.getElementById('download-selected-btn');

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            favorites.clear();
            saveFavorites();
            updateFavoritesBar();
            renderPhotoGrid(); // Refresh grid to update heart icons
            showClientToast('Selección limpiada', 'success');
        });
    }

    if (downloadSelBtn) {
        downloadSelBtn.addEventListener('click', () => downloadSelectedPhotos());
    }
}

function updateFavoritesBar() {
    const bar = document.getElementById('favorites-bar');
    const countEl = document.getElementById('fav-count-number');

    if (!bar) return;

    if (favorites.size > 0) {
        bar.classList.add('visible');
        if (countEl) countEl.textContent = favorites.size;
    } else {
        bar.classList.remove('visible');
    }
}

/* ==========================================================================
   10. DOWNLOADS (ZIP with JSZip)
   ========================================================================== */
function initDownloadAll() {
    const downloadAllBtn = document.getElementById('download-all-btn');
    if (downloadAllBtn) {
        downloadAllBtn.addEventListener('click', () => downloadPhotosAsZip(allPhotosFlat, 'Todas las fotos'));
    }
}

async function downloadSelectedPhotos() {
    const selectedPhotos = allPhotosFlat.filter(p => favorites.has(p.id));
    if (selectedPhotos.length === 0) {
        showClientToast('No hay fotos seleccionadas', 'error');
        return;
    }
    await downloadPhotosAsZip(selectedPhotos, `${selectedPhotos.length} fotos seleccionadas`);
}

async function downloadPhotosAsZip(photos, label) {
    if (isDownloading) return;
    isDownloading = true;

    const overlay = document.getElementById('download-overlay');
    const progressFill = document.getElementById('download-progress-fill');
    const statusEl = document.getElementById('download-status');
    const descEl = document.getElementById('download-description');

    overlay.classList.add('active');
    descEl.textContent = `Empaquetando ${label} en calidad original`;
    progressFill.style.width = '0%';
    statusEl.textContent = `0 / ${photos.length} fotos procesadas`;

    try {
        const zip = new JSZip();
        let completed = 0;

        // Group photos by section for folder structure
        const photosBySection = {};
        photos.forEach(photo => {
            const section = allSections.find(s => s.id === photo.sectionId);
            const folderName = section ? section.name : 'General';
            if (!photosBySection[folderName]) photosBySection[folderName] = [];
            photosBySection[folderName].push(photo);
        });

        // Download and add to ZIP
        for (const [folderName, sectionPhotos] of Object.entries(photosBySection)) {
            const folder = photos.length > 1 && allSections.length > 1
                ? zip.folder(folderName)
                : zip;

            for (const photo of sectionPhotos) {
                try {
                    const response = await fetch(photo.originalUrl);
                    const blob = await response.blob();
                    folder.file(photo.fileName, blob);
                } catch (err) {
                    console.error(`Error fetching ${photo.fileName}:`, err);
                    // Try with preview as fallback
                    try {
                        const response = await fetch(photo.previewUrl);
                        const blob = await response.blob();
                        folder.file(photo.fileName, blob);
                    } catch (e) {
                        console.error(`Skipping ${photo.fileName}`);
                    }
                }

                completed++;
                const pct = Math.round((completed / photos.length) * 100);
                progressFill.style.width = pct + '%';
                statusEl.textContent = `${completed} / ${photos.length} fotos procesadas`;
            }
        }

        // Generate ZIP
        statusEl.textContent = 'Generando archivo ZIP...';
        progressFill.style.width = '100%';

        const zipBlob = await zip.generateAsync({
            type: 'blob',
            compression: 'STORE' // No compression for images (they're already compressed)
        }, (metadata) => {
            statusEl.textContent = `Comprimiendo... ${Math.round(metadata.percent)}%`;
        });

        // Download ZIP
        const galleryName = galleryData ? galleryData.title.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]/g, '').trim() : 'galeria';
        saveAs(zipBlob, `${galleryName}.zip`);

        showClientToast(`${photos.length} fotos descargadas`, 'success');
    } catch (err) {
        console.error('Error creating ZIP:', err);
        showClientToast('Error al crear el archivo ZIP', 'error');
    } finally {
        overlay.classList.remove('active');
        isDownloading = false;
    }
}

/* ==========================================================================
   11. HELPER FUNCTIONS
   ========================================================================== */

/** Adjust hex color brightness */
function adjustColor(hex, amount) {
    hex = hex.replace('#', '');
    const num = parseInt(hex, 16);
    let r = Math.min(255, Math.max(0, (num >> 16) + amount));
    let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    let b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

/** Client toast notifications */
function showClientToast(message, type = 'success') {
    const container = document.getElementById('gallery-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `gallery-toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
