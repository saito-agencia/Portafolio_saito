/* ==========================================================================
   ADMIN PANEL — René Saito Client Galleries
   Lógica completa del panel de administración de galerías
   ========================================================================== */

/* ---------- STATE ---------- */
let currentUser = null;
let currentGalleryId = null;
let currentGalleryData = null;
let gallerySections = [];
let sectionPhotos = [];
let selectedUploadSection = '';

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
    initThemeForAdmin();
    initAuthListener();
    initLoginForm();
    initLogout();
    initCreateGallery();
    initEditorTabs();
    initEditorBack();
    initCoverCustomization();
    initSectionManager();
    initPhotoUpload();
    initShareActions();
    initDeleteGallery();
});

/* ==========================================================================
   1. THEME (reutiliza la preferencia del portafolio)
   ========================================================================== */
function initThemeForAdmin() {
    const saved = localStorage.getItem('saito-portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);

    // Update logo based on theme
    updateAdminLogos(saved);
}

function updateAdminLogos(theme) {
    const loginLogo = document.getElementById('login-logo');
    const adminLogo = document.getElementById('admin-logo');
    const lightSrc = 'assets/images/LOGO SAITO CLARO.png';
    const darkSrc = 'assets/images/LOGO SAITO OSCURO.png';

    // In light mode (cream bg), use dark logo. In dark mode (blue bg), use light logo.
    const src = theme === 'dark' ? lightSrc : darkSrc;
    if (loginLogo) loginLogo.src = src;
    if (adminLogo) adminLogo.src = src;
}

/* ==========================================================================
   2. AUTHENTICATION
   ========================================================================== */
function initAuthListener() {
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('admin-dashboard').classList.remove('hidden');
            document.getElementById('admin-email-display').textContent = user.email;
            loadGalleries();
        } else {
            currentUser = null;
            document.getElementById('login-screen').classList.remove('hidden');
            document.getElementById('admin-dashboard').classList.add('hidden');
        }
    });
}

function initLoginForm() {
    const form = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const errorEl = document.getElementById('login-error');
    const errorText = document.getElementById('login-error-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value.trim();
        const password = document.getElementById('admin-password').value;

        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Entrando...</span>';
        errorEl.classList.remove('visible');

        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            let msg = 'Error de autenticación';
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                msg = 'Correo o contraseña incorrectos';
            } else if (err.code === 'auth/too-many-requests') {
                msg = 'Demasiados intentos. Espera unos minutos.';
            }
            errorText.textContent = msg;
            errorEl.classList.add('visible');
        } finally {
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> <span>Iniciar Sesión</span>';
        }
    });
}

function initLogout() {
    document.getElementById('logout-btn').addEventListener('click', () => {
        auth.signOut();
    });
}

/* ==========================================================================
   3. GALLERY LIST (Dashboard)
   ========================================================================== */
async function loadGalleries() {
    const listEl = document.getElementById('gallery-list');
    listEl.innerHTML = '<div class="empty-state"><i class="fa-solid fa-spinner fa-spin"></i><p>Cargando galerías...</p></div>';

    try {
        const snapshot = await db.collection('galleries')
            .orderBy('createdAt', 'desc')
            .get();

        if (snapshot.empty) {
            listEl.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-images"></i>
                    <p>Aún no tienes galerías</p>
                    <button class="g-btn g-btn-primary" onclick="document.getElementById('create-gallery-btn').click()">
                        <i class="fa-solid fa-plus"></i> Crear tu primera galería
                    </button>
                </div>
            `;
            return;
        }

        listEl.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            listEl.appendChild(createGalleryCard(doc.id, data));
        });
    } catch (err) {
        console.error('Error loading galleries:', err);
        listEl.innerHTML = '<div class="empty-state"><i class="fa-solid fa-circle-exclamation"></i><p>Error cargando galerías</p></div>';
    }
}

function createGalleryCard(id, data) {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.onclick = () => openGalleryEditor(id);

    const dateStr = data.date ? new Date(data.date + 'T00:00:00').toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Sin fecha';
    const hasPassword = data.password && data.password.length > 0;

    card.innerHTML = `
        <div class="gallery-card-cover">
            ${data.coverPhotoUrl
            ? `<img src="${data.coverPhotoUrl}" alt="${data.title}" loading="lazy">`
            : `<i class="fa-solid fa-image"></i>`
        }
        </div>
        <div class="gallery-card-body">
            <h3 class="gallery-card-title">${data.title || 'Sin título'}</h3>
            <div class="gallery-card-meta">
                <span><i class="fa-regular fa-calendar"></i> ${dateStr}</span>
                <span><i class="fa-solid fa-images"></i> ${data.totalPhotos || 0} fotos</span>
                ${hasPassword ? '<span><i class="fa-solid fa-lock"></i> Protegida</span>' : ''}
            </div>
            <div class="gallery-card-actions">
                <button class="g-btn g-btn-secondary g-btn-sm" onclick="event.stopPropagation(); openGalleryEditor('${id}')">
                    <i class="fa-solid fa-pen"></i> Editar
                </button>
                <button class="g-btn g-btn-secondary g-btn-sm" onclick="event.stopPropagation(); copyGalleryLink('${id}')">
                    <i class="fa-solid fa-link"></i> Link
                </button>
            </div>
        </div>
    `;
    return card;
}

function initCreateGallery() {
    document.getElementById('create-gallery-btn').addEventListener('click', async () => {
        try {
            const docRef = await db.collection('galleries').add({
                title: 'Nueva Galería',
                clientName: '',
                date: new Date().toISOString().split('T')[0],
                description: '',
                coverPhotoUrl: '',
                accentColor: '#264CC0',
                coverStyle: 'minimal',
                password: '',
                isActive: true,
                totalPhotos: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Create a default section
            await db.collection('galleries').doc(docRef.id)
                .collection('sections').add({
                    name: 'General',
                    order: 0,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            showGalleryToast('Galería creada', 'success');
            openGalleryEditor(docRef.id);
        } catch (err) {
            console.error('Error creating gallery:', err);
            showGalleryToast('Error al crear galería', 'error');
        }
    });
}

/* ==========================================================================
   4. GALLERY EDITOR
   ========================================================================== */
async function openGalleryEditor(galleryId) {
    currentGalleryId = galleryId;

    document.getElementById('gallery-list-view').classList.add('hidden');
    document.getElementById('gallery-editor-view').classList.remove('hidden');

    try {
        const doc = await db.collection('galleries').doc(galleryId).get();
        if (!doc.exists) {
            showGalleryToast('Galería no encontrada', 'error');
            closeGalleryEditor();
            return;
        }

        currentGalleryData = doc.data();
        populateEditorFields(currentGalleryData);
        await loadSections(galleryId);
        updateShareInfo();

        // Auto-select first tab
        switchEditorTab('settings');
    } catch (err) {
        console.error('Error loading gallery:', err);
        showGalleryToast('Error cargando galería', 'error');
    }
}

function closeGalleryEditor() {
    currentGalleryId = null;
    currentGalleryData = null;
    gallerySections = [];
    sectionPhotos = [];

    document.getElementById('gallery-editor-view').classList.add('hidden');
    document.getElementById('gallery-list-view').classList.remove('hidden');

    loadGalleries();
}

function initEditorBack() {
    document.getElementById('editor-back-btn').addEventListener('click', closeGalleryEditor);
}

function populateEditorFields(data) {
    document.getElementById('editor-title').textContent = data.title || 'Editar Galería';
    document.getElementById('gallery-title').value = data.title || '';
    document.getElementById('gallery-client').value = data.clientName || '';
    document.getElementById('gallery-date').value = data.date || '';
    document.getElementById('gallery-password').value = data.password || '';
    document.getElementById('gallery-description').value = data.description || '';

    // Cover settings
    document.getElementById('accent-color').value = data.accentColor || '#264CC0';
    document.getElementById('color-preview').style.background = data.accentColor || '#264CC0';

    // Cover style
    document.querySelectorAll('.cover-style-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.style === (data.coverStyle || 'minimal'));
    });

    // Cover preview
    if (data.coverPhotoUrl) {
        document.getElementById('cover-preview-img').src = data.coverPhotoUrl;
        document.getElementById('cover-preview-container').classList.remove('hidden');
    } else {
        document.getElementById('cover-preview-container').classList.add('hidden');
    }
}

/* Editor Tabs */
function initEditorTabs() {
    document.querySelectorAll('.editor-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchEditorTab(tab.dataset.tab);
        });
    });
}

function switchEditorTab(tabName) {
    document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.editor-panel').forEach(p => p.classList.remove('active'));

    const tab = document.querySelector(`.editor-tab[data-tab="${tabName}"]`);
    const panel = document.getElementById(`panel-${tabName}`);

    if (tab) tab.classList.add('active');
    if (panel) panel.classList.add('active');

    // Load section-specific data when switching
    if (tabName === 'photos' && gallerySections.length > 0) {
        populateSectionSelect();
        if (selectedUploadSection) {
            loadSectionPhotos(selectedUploadSection);
        }
    }
}

/* Save Settings */
document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            if (!currentGalleryId) return;

            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';

            try {
                await db.collection('galleries').doc(currentGalleryId).update({
                    title: document.getElementById('gallery-title').value.trim(),
                    clientName: document.getElementById('gallery-client').value.trim(),
                    date: document.getElementById('gallery-date').value,
                    password: document.getElementById('gallery-password').value.trim(),
                    description: document.getElementById('gallery-description').value.trim()
                });

                currentGalleryData.title = document.getElementById('gallery-title').value.trim();
                currentGalleryData.password = document.getElementById('gallery-password').value.trim();
                document.getElementById('editor-title').textContent = currentGalleryData.title || 'Editar Galería';
                updateShareInfo();
                showGalleryToast('Configuración guardada', 'success');
            } catch (err) {
                console.error('Error saving:', err);
                showGalleryToast('Error al guardar', 'error');
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar Configuración';
            }
        });
    }
});

/* ==========================================================================
   5. COVER CUSTOMIZATION
   ========================================================================== */
function initCoverCustomization() {
    // Color picker
    const colorInput = document.getElementById('accent-color');
    const colorPreview = document.getElementById('color-preview');

    if (colorInput) {
        colorInput.addEventListener('input', (e) => {
            colorPreview.style.background = e.target.value;
        });
    }

    // Cover style options
    document.querySelectorAll('.cover-style-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.cover-style-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });

    // Cover photo upload
    const coverInput = document.getElementById('cover-file-input');
    const coverZone = document.getElementById('cover-upload-zone');

    if (coverInput) {
        coverInput.addEventListener('change', handleCoverUpload);
    }

    if (coverZone) {
        coverZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            coverZone.classList.add('dragover');
        });
        coverZone.addEventListener('dragleave', () => coverZone.classList.remove('dragover'));
        coverZone.addEventListener('drop', (e) => {
            e.preventDefault();
            coverZone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                coverInput.files = e.dataTransfer.files;
                handleCoverUpload();
            }
        });
    }

    // Save cover button
    const saveCoverBtn = document.getElementById('save-cover-btn');
    if (saveCoverBtn) {
        saveCoverBtn.addEventListener('click', async () => {
            if (!currentGalleryId) return;

            saveCoverBtn.disabled = true;
            saveCoverBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';

            const selectedStyle = document.querySelector('.cover-style-option.selected');

            try {
                await db.collection('galleries').doc(currentGalleryId).update({
                    accentColor: document.getElementById('accent-color').value,
                    coverStyle: selectedStyle ? selectedStyle.dataset.style : 'minimal'
                });

                currentGalleryData.accentColor = document.getElementById('accent-color').value;
                currentGalleryData.coverStyle = selectedStyle ? selectedStyle.dataset.style : 'minimal';
                showGalleryToast('Portada guardada', 'success');
            } catch (err) {
                console.error('Error saving cover:', err);
                showGalleryToast('Error al guardar portada', 'error');
            } finally {
                saveCoverBtn.disabled = false;
                saveCoverBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar Portada';
            }
        });
    }
}

async function handleCoverUpload() {
    const input = document.getElementById('cover-file-input');
    const file = input.files[0];
    if (!file || !currentGalleryId) return;

    showGalleryToast('Subiendo foto de portada...', 'success');

    try {
        // Upload original cover
        const coverRef = storage.ref(`galleries/${currentGalleryId}/cover/${file.name}`);
        await coverRef.put(file);
        const coverUrl = await coverRef.getDownloadURL();

        // Update Firestore
        await db.collection('galleries').doc(currentGalleryId).update({
            coverPhotoUrl: coverUrl
        });

        currentGalleryData.coverPhotoUrl = coverUrl;

        // Show preview
        document.getElementById('cover-preview-img').src = coverUrl;
        document.getElementById('cover-preview-container').classList.remove('hidden');

        showGalleryToast('Foto de portada actualizada', 'success');
    } catch (err) {
        console.error('Error uploading cover:', err);
        showGalleryToast('Error subiendo la portada', 'error');
    }
}

/* ==========================================================================
   6. SECTIONS MANAGER
   ========================================================================== */
function initSectionManager() {
    const addBtn = document.getElementById('add-section-btn');
    const nameInput = document.getElementById('new-section-name');

    if (addBtn) {
        addBtn.addEventListener('click', () => addSection());
    }

    if (nameInput) {
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSection();
            }
        });
    }
}

async function loadSections(galleryId) {
    try {
        const snapshot = await db.collection('galleries').doc(galleryId)
            .collection('sections')
            .orderBy('order', 'asc')
            .get();

        gallerySections = [];
        snapshot.forEach(doc => {
            gallerySections.push({ id: doc.id, ...doc.data() });
        });

        renderSectionsList();
        populateSectionSelect();

        // Select first section for photo viewing
        if (gallerySections.length > 0) {
            selectedUploadSection = gallerySections[0].id;
            const select = document.getElementById('upload-section-select');
            if (select) select.value = selectedUploadSection;
        }
    } catch (err) {
        console.error('Error loading sections:', err);
    }
}

function renderSectionsList() {
    const listEl = document.getElementById('sections-list');
    if (!listEl) return;

    if (gallerySections.length === 0) {
        listEl.innerHTML = '<p class="text-muted text-center" style="padding:1rem;font-size:0.85rem;">No hay secciones. Agrega una para organizar tus fotos.</p>';
        return;
    }

    listEl.innerHTML = '';
    gallerySections.forEach((section, index) => {
        const item = document.createElement('div');
        item.className = 'section-item';
        item.innerHTML = `
            <span class="drag-handle"><i class="fa-solid fa-grip-vertical"></i></span>
            <span class="section-name">${section.name}</span>
            <span class="section-count">${section.photoCount || 0} fotos</span>
            <div class="section-actions">
                <button onclick="renameSection('${section.id}', '${section.name}')" title="Renombrar">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="delete-btn" onclick="deleteSection('${section.id}')" title="Eliminar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        listEl.appendChild(item);
    });
}

function populateSectionSelect() {
    const select = document.getElementById('upload-section-select');
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = '<option value="">— Selecciona una sección —</option>';
    gallerySections.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.name;
        select.appendChild(opt);
    });

    if (currentVal && gallerySections.find(s => s.id === currentVal)) {
        select.value = currentVal;
    } else if (gallerySections.length > 0) {
        select.value = gallerySections[0].id;
        selectedUploadSection = gallerySections[0].id;
    }

    select.onchange = () => {
        selectedUploadSection = select.value;
        if (selectedUploadSection) {
            loadSectionPhotos(selectedUploadSection);
        }
    };
}

async function addSection() {
    const nameInput = document.getElementById('new-section-name');
    const name = nameInput.value.trim();
    if (!name || !currentGalleryId) return;

    try {
        await db.collection('galleries').doc(currentGalleryId)
            .collection('sections').add({
                name: name,
                order: gallerySections.length,
                photoCount: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

        nameInput.value = '';
        await loadSections(currentGalleryId);
        showGalleryToast(`Sección "${name}" creada`, 'success');
    } catch (err) {
        console.error('Error adding section:', err);
        showGalleryToast('Error al crear sección', 'error');
    }
}

async function renameSection(sectionId, currentName) {
    const newName = prompt('Nuevo nombre para la sección:', currentName);
    if (!newName || newName.trim() === currentName || !currentGalleryId) return;

    try {
        await db.collection('galleries').doc(currentGalleryId)
            .collection('sections').doc(sectionId).update({ name: newName.trim() });
        await loadSections(currentGalleryId);
        showGalleryToast('Sección renombrada', 'success');
    } catch (err) {
        console.error('Error renaming section:', err);
        showGalleryToast('Error al renombrar', 'error');
    }
}

async function deleteSection(sectionId) {
    if (!confirm('¿Eliminar esta sección y todas sus fotos?')) return;
    if (!currentGalleryId) return;

    try {
        // Delete all photos in section
        const photosSnap = await db.collection('galleries').doc(currentGalleryId)
            .collection('sections').doc(sectionId)
            .collection('photos').get();

        const batch = db.batch();
        const storageDeletePromises = [];

        photosSnap.forEach(doc => {
            const photoData = doc.data();
            batch.delete(doc.ref);
            // Delete files from storage
            if (photoData.originalPath) {
                storageDeletePromises.push(
                    storage.ref(photoData.originalPath).delete().catch(() => { })
                );
            }
            if (photoData.previewPath) {
                storageDeletePromises.push(
                    storage.ref(photoData.previewPath).delete().catch(() => { })
                );
            }
        });

        // Delete section document
        batch.delete(db.collection('galleries').doc(currentGalleryId)
            .collection('sections').doc(sectionId));

        await batch.commit();
        await Promise.allSettled(storageDeletePromises);

        // Update total count
        await updateTotalPhotoCount();

        await loadSections(currentGalleryId);
        showGalleryToast('Sección eliminada', 'success');
    } catch (err) {
        console.error('Error deleting section:', err);
        showGalleryToast('Error al eliminar sección', 'error');
    }
}

/* ==========================================================================
   7. PHOTO UPLOAD
   ========================================================================== */
function initPhotoUpload() {
    const fileInput = document.getElementById('photos-file-input');
    const uploadZone = document.getElementById('photos-upload-zone');

    if (fileInput) {
        fileInput.addEventListener('change', () => handlePhotoFiles(fileInput.files));
    }

    if (uploadZone) {
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });
        uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            handlePhotoFiles(e.dataTransfer.files);
        });
    }
}

async function handlePhotoFiles(fileList) {
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) return;

    const sectionId = document.getElementById('upload-section-select').value;
    if (!sectionId) {
        showGalleryToast('Selecciona una sección primero', 'error');
        return;
    }

    if (!currentGalleryId) return;

    // Show progress UI
    const progressContainer = document.getElementById('upload-progress');
    const itemsList = document.getElementById('upload-items-list');
    const totalFill = document.getElementById('upload-total-fill');
    const countEl = document.getElementById('upload-count');
    const percentEl = document.getElementById('upload-percent');

    progressContainer.classList.remove('hidden');
    itemsList.innerHTML = '';

    let completed = 0;
    const total = files.length;

    // Update total progress
    function updateTotalProgress() {
        completed++;
        const pct = Math.round((completed / total) * 100);
        totalFill.style.width = pct + '%';
        countEl.textContent = `${completed} / ${total} fotos`;
        percentEl.textContent = pct + '%';
    }

    // Upload files sequentially (to avoid overwhelming the browser)
    for (const file of files) {
        // Create progress item
        const item = document.createElement('div');
        item.className = 'upload-progress-item';
        item.innerHTML = `
            <span class="file-name">${file.name}</span>
            <div class="upload-progress-bar"><div class="upload-progress-bar-fill"></div></div>
            <span class="progress-text">0%</span>
        `;
        itemsList.prepend(item);

        const fillBar = item.querySelector('.upload-progress-bar-fill');
        const pctText = item.querySelector('.progress-text');

        try {
            // Generate optimized preview
            const previewBlob = await optimizeImage(file, 2000, 0.8);

            // Upload original
            const originalPath = `galleries/${currentGalleryId}/${sectionId}/originals/${Date.now()}_${file.name}`;
            const originalRef = storage.ref(originalPath);
            const uploadTask = originalRef.put(file);

            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 80);
                        fillBar.style.width = pct + '%';
                        pctText.textContent = pct + '%';
                    },
                    reject,
                    resolve
                );
            });

            const originalUrl = await originalRef.getDownloadURL();

            // Upload preview
            fillBar.style.width = '85%';
            pctText.textContent = '85%';

            const previewPath = `galleries/${currentGalleryId}/${sectionId}/previews/${Date.now()}_${file.name}`;
            const previewRef = storage.ref(previewPath);
            await previewRef.put(previewBlob);
            const previewUrl = await previewRef.getDownloadURL();

            fillBar.style.width = '95%';
            pctText.textContent = '95%';

            // Save photo metadata to Firestore
            await db.collection('galleries').doc(currentGalleryId)
                .collection('sections').doc(sectionId)
                .collection('photos').add({
                    originalPath: originalPath,
                    previewPath: previewPath,
                    originalUrl: originalUrl,
                    previewUrl: previewUrl,
                    fileName: file.name,
                    fileSize: file.size,
                    order: completed,
                    uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            // Done
            fillBar.style.width = '100%';
            pctText.textContent = '✓';
            item.classList.add('complete');
            updateTotalProgress();

        } catch (err) {
            console.error(`Error uploading ${file.name}:`, err);
            fillBar.style.width = '100%';
            fillBar.style.background = '#dc3545';
            pctText.textContent = '✗';
            updateTotalProgress();
        }
    }

    // Update section photo count
    await updateSectionPhotoCount(sectionId);
    await updateTotalPhotoCount();

    // Reload photos grid
    loadSectionPhotos(sectionId);

    showGalleryToast(`${completed} fotos subidas correctamente`, 'success');

    // Reset file input
    document.getElementById('photos-file-input').value = '';
}

/**
 * Optimize image using Canvas API — creates a smaller JPEG for web preview
 */
function optimizeImage(file, maxWidth = 2000, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Scale down if larger than maxWidth
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error('Canvas toBlob failed'));
                    },
                    'image/jpeg',
                    quality
                );
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/* ==========================================================================
   8. ADMIN PHOTO GRID (Thumbnails in editor)
   ========================================================================== */
async function loadSectionPhotos(sectionId) {
    const grid = document.getElementById('admin-photos-grid');
    const countEl = document.getElementById('section-photo-count');
    if (!grid || !currentGalleryId) return;

    grid.innerHTML = '<div class="text-center text-muted" style="grid-column:1/-1;padding:1rem;"><i class="fa-solid fa-spinner fa-spin"></i></div>';

    try {
        const snapshot = await db.collection('galleries').doc(currentGalleryId)
            .collection('sections').doc(sectionId)
            .collection('photos')
            .orderBy('order', 'asc')
            .get();

        sectionPhotos = [];
        snapshot.forEach(doc => {
            sectionPhotos.push({ id: doc.id, ...doc.data() });
        });

        countEl.textContent = sectionPhotos.length;

        if (sectionPhotos.length === 0) {
            grid.innerHTML = '<div class="text-center text-muted" style="grid-column:1/-1;padding:2rem;"><i class="fa-solid fa-image" style="font-size:1.5rem;margin-bottom:0.5rem;display:block;"></i>No hay fotos en esta sección</div>';
            return;
        }

        grid.innerHTML = '';
        sectionPhotos.forEach(photo => {
            const thumb = document.createElement('div');
            thumb.className = 'admin-photo-thumb';
            thumb.innerHTML = `
                <img src="${photo.previewUrl}" alt="${photo.fileName}" loading="lazy">
                <div class="photo-overlay">
                    <button onclick="deletePhoto('${sectionId}', '${photo.id}', '${photo.originalPath}', '${photo.previewPath}')" title="Eliminar foto">
                        <i class="fa-solid fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            grid.appendChild(thumb);
        });
    } catch (err) {
        console.error('Error loading photos:', err);
        grid.innerHTML = '<div class="text-center text-muted" style="grid-column:1/-1;">Error cargando fotos</div>';
    }
}

async function deletePhoto(sectionId, photoId, originalPath, previewPath) {
    if (!confirm('¿Eliminar esta foto?')) return;
    if (!currentGalleryId) return;

    try {
        // Delete from Firestore
        await db.collection('galleries').doc(currentGalleryId)
            .collection('sections').doc(sectionId)
            .collection('photos').doc(photoId).delete();

        // Delete from Storage
        await storage.ref(originalPath).delete().catch(() => { });
        await storage.ref(previewPath).delete().catch(() => { });

        // Update counts
        await updateSectionPhotoCount(sectionId);
        await updateTotalPhotoCount();

        // Reload
        loadSectionPhotos(sectionId);
        showGalleryToast('Foto eliminada', 'success');
    } catch (err) {
        console.error('Error deleting photo:', err);
        showGalleryToast('Error al eliminar foto', 'error');
    }
}

async function updateSectionPhotoCount(sectionId) {
    if (!currentGalleryId) return;

    try {
        const snap = await db.collection('galleries').doc(currentGalleryId)
            .collection('sections').doc(sectionId)
            .collection('photos').get();

        await db.collection('galleries').doc(currentGalleryId)
            .collection('sections').doc(sectionId)
            .update({ photoCount: snap.size });

        // Update local data
        const section = gallerySections.find(s => s.id === sectionId);
        if (section) section.photoCount = snap.size;
        renderSectionsList();
    } catch (err) {
        console.error('Error updating section count:', err);
    }
}

async function updateTotalPhotoCount() {
    if (!currentGalleryId) return;

    try {
        let total = 0;
        const sectionsSnap = await db.collection('galleries').doc(currentGalleryId)
            .collection('sections').get();

        for (const sectionDoc of sectionsSnap.docs) {
            const photosSnap = await sectionDoc.ref.collection('photos').get();
            total += photosSnap.size;
        }

        await db.collection('galleries').doc(currentGalleryId).update({
            totalPhotos: total
        });

        if (currentGalleryData) currentGalleryData.totalPhotos = total;
        updateShareInfo();
    } catch (err) {
        console.error('Error updating total count:', err);
    }
}

/* ==========================================================================
   9. SHARE / LINK
   ========================================================================== */
function initShareActions() {
    const copyBtn = document.getElementById('copy-link-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const input = document.getElementById('share-link-input');
            input.select();
            navigator.clipboard.writeText(input.value).then(() => {
                showGalleryToast('Link copiado al portapapeles', 'success');
            }).catch(() => {
                // Fallback
                document.execCommand('copy');
                showGalleryToast('Link copiado', 'success');
            });
        });
    }

    const previewBtn = document.getElementById('preview-gallery-btn');
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            if (currentGalleryId) {
                window.open(`gallery.html?id=${currentGalleryId}`, '_blank');
            }
        });
    }
}

function updateShareInfo() {
    if (!currentGalleryId || !currentGalleryData) return;

    const baseUrl = window.location.origin + window.location.pathname.replace('admin.html', '');
    const link = `${baseUrl}gallery.html?id=${currentGalleryId}`;

    const linkInput = document.getElementById('share-link-input');
    if (linkInput) linkInput.value = link;

    const passDisplay = document.getElementById('share-password-display');
    if (passDisplay) {
        passDisplay.textContent = currentGalleryData.password || 'Sin contraseña';
    }

    const countDisplay = document.getElementById('share-photo-count');
    if (countDisplay) {
        countDisplay.textContent = currentGalleryData.totalPhotos || 0;
    }
}

function copyGalleryLink(galleryId) {
    const baseUrl = window.location.origin + window.location.pathname.replace('admin.html', '');
    const link = `${baseUrl}gallery.html?id=${galleryId}`;

    navigator.clipboard.writeText(link).then(() => {
        showGalleryToast('Link copiado', 'success');
    }).catch(() => {
        prompt('Copia este link:', link);
    });
}

/* ==========================================================================
   10. DELETE GALLERY
   ========================================================================== */
function initDeleteGallery() {
    const deleteBtn = document.getElementById('delete-gallery-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            if (!currentGalleryId) return;

            const confirmation = prompt('Escribe "ELIMINAR" para confirmar la eliminación de esta galería:');
            if (confirmation !== 'ELIMINAR') {
                showGalleryToast('Eliminación cancelada', 'error');
                return;
            }

            deleteBtn.disabled = true;
            deleteBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Eliminando...';

            try {
                // Delete all sections and their photos
                const sectionsSnap = await db.collection('galleries').doc(currentGalleryId)
                    .collection('sections').get();

                for (const sectionDoc of sectionsSnap.docs) {
                    const photosSnap = await sectionDoc.ref.collection('photos').get();

                    for (const photoDoc of photosSnap.docs) {
                        const photoData = photoDoc.data();
                        // Delete storage files
                        if (photoData.originalPath) {
                            await storage.ref(photoData.originalPath).delete().catch(() => { });
                        }
                        if (photoData.previewPath) {
                            await storage.ref(photoData.previewPath).delete().catch(() => { });
                        }
                        await photoDoc.ref.delete();
                    }

                    await sectionDoc.ref.delete();
                }

                // Delete cover from storage
                if (currentGalleryData.coverPhotoUrl) {
                    try {
                        const coverRef = storage.refFromURL(currentGalleryData.coverPhotoUrl);
                        await coverRef.delete();
                    } catch (e) { /* ignore */ }
                }

                // Delete gallery document
                await db.collection('galleries').doc(currentGalleryId).delete();

                showGalleryToast('Galería eliminada', 'success');
                closeGalleryEditor();
            } catch (err) {
                console.error('Error deleting gallery:', err);
                showGalleryToast('Error al eliminar galería', 'error');
                deleteBtn.disabled = false;
                deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Eliminar Galería';
            }
        });
    }
}

/* ==========================================================================
   11. TOAST NOTIFICATIONS
   ========================================================================== */
function showGalleryToast(message, type = 'success') {
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
