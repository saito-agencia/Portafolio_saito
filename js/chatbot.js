/**
 * ============================================================================
 * SAITOBOT - ASISTENTE CHATBOT FLOTANTE
 * Interacción interactiva, respuestas rápidas y derivación a WhatsApp
 * ============================================================================
 */

(function () {
    'use strict';

    // Constantes de configuración
    const WHATSAPP_BASE_URL = 'https://wa.me/qr/AIB3PY3H74K6I1';
    const STORAGE_KEY = 'saito_chat_history_v1';
    const STORAGE_STATUS_KEY = 'saito_chat_opened';

    // Respuestas y flujos de diálogo
    const BOT_FLOWS = {
        main: {
            text: "¡Hola! 👋 Soy el asistente de <strong>René Saito</strong>.<br>¿En qué podemos ayudarte hoy?",
            options: [
                { text: "📸 Fotografía & Bodas", action: "flow_bodas" },
                { text: "💻 Desarrollo Web & UI/UX", action: "flow_web" },
                { text: "💰 ¿Cómo cotizar?", action: "flow_quote" },
                { text: "💬 Hablar por WhatsApp", action: "flow_whatsapp", isWhatsapp: true }
            ]
        },
        flow_bodas: {
            text: "💍 <strong>Fotografía & Cobertura de Bodas:</strong><br><br>" +
                "René ofrece cobertura visual artística y cinematográfica:<br>" +
                "• Cobertura completa de boda (ceremonia, fiesta y sesión formal).<br>" +
                "• Sesión Casual / Save the Date.<br>" +
                "• Entrega en galería digital privada en alta resolución.<br><br>" +
                "¿Te gustaría consultar disponibilidad o cotizar tu fecha?",
            options: [
                { text: "📅 Cotizar mi fecha de Boda", action: "wa_boda", isWhatsapp: true },
                { text: "Ver Portafolio de Bodas", action: "go_bodas" },
                { text: "⬅️ Menú Principal", action: "main" }
            ]
        },
        flow_web: {
            text: "🚀 <strong>Desarrollo Web & Diseño UI/UX:</strong><br><br>" +
                "Especializado en crear productos digitales rápidos, modernos y elegantes:<br>" +
                "• Sitios Web y Landing Pages de alta conversión.<br>" +
                "• Aplicaciones Web a medida (JavaScript, React, Firebase, Node).<br>" +
                "• Diseño de interfaces UI/UX intuitivas y atractivas.<br>" +
                "• Optimización de velocidad y SEO técnico.<br><br>" +
                "¿Tienes una idea o proyecto en mente?",
            options: [
                { text: "💼 Cotizar Proyecto Web", action: "wa_web", isWhatsapp: true },
                { text: "Ver Proyectos Realizados", action: "go_projects" },
                { text: "⬅️ Menú Principal", action: "main" }
            ]
        },
        flow_quote: {
            text: "💰 <strong>Cómo solicitar tu cotización:</strong><br><br>" +
                "Para darte una propuesta personalizada de inmediato, indícanos:<br>" +
                "1️⃣ Tipo de servicio (Boda, Sesión fotográfica o Desarrollo web).<br>" +
                "2️⃣ Fecha aproximada o plazo deseado.<br>" +
                "3️⃣ Detalles o requerimientos especiales.<br><br>" +
                "¡Escríbenos directamente y te responderemos hoy mismo!",
            options: [
                { text: "💬 Enviar detalles por WhatsApp", action: "wa_quote", isWhatsapp: true },
                { text: "⬅️ Menú Principal", action: "main" }
            ]
        }
    };

    // Respuestas por palabras clave
    const KEYWORD_RULES = [
        {
            keywords: ['boda', 'matrimonio', 'novia', 'novio', 'save the date', 'fotografia', 'foto', 'sesion', 'cobertura'],
            flow: 'flow_bodas'
        },
        {
            keywords: ['web', 'pagina', 'sitio', 'app', 'codigo', 'software', 'programador', 'developer', 'ui', 'ux', 'landing', 'sistema'],
            flow: 'flow_web'
        },
        {
            keywords: ['precio', 'costo', 'cotiz', 'cuanto', 'tarifa', 'presupuesto', 'cobras', 'planes', 'paquete'],
            flow: 'flow_quote'
        },
        {
            keywords: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'hey', 'saludos'],
            flow: 'main'
        },
        {
            keywords: ['whatsapp', 'telefono', 'numero', 'contacto', 'correo', 'mail', 'escribir'],
            response: {
                text: "Puedes comunicarte directamente con René en WhatsApp a través de nuestro chat directo oficial:",
                options: [
                    { text: "💬 Abrir WhatsApp ahora", action: "flow_whatsapp", isWhatsapp: true },
                    { text: "⬅️ Menú Principal", action: "main" }
                ]
            }
        },
        {
            keywords: ['donde', 'ubicacion', 'ciudad', 'pais', 'lugar', 'viajas'],
            response: {
                text: "📍 <strong>Ubicación & Cobertura:</strong><br><br>" +
                    "René está disponible presencialmente para bodas y sesiones con disponibilidad para viajar a donde sea tu evento, y de forma remota/global para proyectos de desarrollo de software.",
                options: [
                    { text: "💬 Consultar sobre mi ciudad", action: "wa_city", isWhatsapp: true },
                    { text: "⬅️ Menú Principal", action: "main" }
                ]
            }
        }
    ];

    // Inicialización del Widget cuando el DOM esté listo
    function initChatbot() {
        // Evitar duplicación
        if (document.getElementById('saito-chat-widget')) return;

        createChatMarkup();
        attachEventListeners();
        loadHistoryOrInitial();
    }

    // Creación dinámica del marcado HTML
    function createChatMarkup() {
        const widget = document.createElement('div');
        widget.id = 'saito-chat-widget';
        widget.className = 'saito-chat-widget';
        widget.setAttribute('aria-label', 'Asistente Saito');

        widget.innerHTML = `
            <!-- Tooltip flotante inicial -->
            <div class="saito-chat-tooltip" id="saito-chat-tooltip">
                ¿Tienes alguna duda? ¡Chatea con nosotros!
            </div>

            <!-- Botón flotante -->
            <button class="saito-chat-trigger" id="saito-chat-trigger" aria-label="Abrir asistente de chat">
                <i class="fa-solid fa-comments trigger-icon-open"></i>
                <i class="fa-solid fa-xmark trigger-icon-close"></i>
                <span class="saito-chat-badge" id="saito-chat-badge">1</span>
            </button>

            <!-- Ventana del Chat -->
            <div class="saito-chat-window" id="saito-chat-window" aria-hidden="true">
                <!-- Cabecera -->
                <div class="saito-chat-header">
                    <div class="saito-chat-header-info">
                        <div class="saito-chat-avatar">
                            <img src="assets/images/LOGO SAITO CLARO.png" alt="Saito Logo">
                            <span class="saito-status-dot"></span>
                        </div>
                        <div class="saito-chat-title">
                            <h4>Asistente Saito</h4>
                            <span><i class="fa-solid fa-bolt"></i> En línea</span>
                        </div>
                    </div>
                    <div class="saito-chat-header-actions">
                        <button class="saito-chat-btn-icon" id="saito-chat-reset" title="Reiniciar chat" aria-label="Reiniciar conversación">
                            <i class="fa-solid fa-arrow-rotate-right"></i>
                        </button>
                        <button class="saito-chat-btn-icon" id="saito-chat-close" title="Cerrar chat" aria-label="Cerrar ventana">
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                    </div>
                </div>

                <!-- Cuerpo de mensajes -->
                <div class="saito-chat-body" id="saito-chat-body">
                    <!-- Los mensajes se inyectan dinámicamente aquí -->
                </div>

                <!-- Pie con input de texto -->
                <div class="saito-chat-footer">
                    <form class="saito-chat-form" id="saito-chat-form">
                        <input type="text" 
                               class="saito-chat-input" 
                               id="saito-chat-input" 
                               placeholder="Escribe tu consulta aquí..." 
                               autocomplete="off"
                               maxlength="300"
                               aria-label="Mensaje para el asistente">
                        <button type="submit" class="saito-chat-submit" id="saito-chat-submit" aria-label="Enviar mensaje">
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(widget);
    }

    // Manejo de eventos
    function attachEventListeners() {
        const widget = document.getElementById('saito-chat-widget');
        const trigger = document.getElementById('saito-chat-trigger');
        const closeBtn = document.getElementById('saito-chat-close');
        const resetBtn = document.getElementById('saito-chat-reset');
        const form = document.getElementById('saito-chat-form');
        const input = document.getElementById('saito-chat-input');
        const tooltip = document.getElementById('saito-chat-tooltip');
        const badge = document.getElementById('saito-chat-badge');
        const chatWindow = document.getElementById('saito-chat-window');

        // Toggle del chat
        function toggleChat() {
            const isActive = widget.classList.toggle('active');
            chatWindow.setAttribute('aria-hidden', !isActive);

            if (isActive) {
                if (badge) badge.classList.add('hidden');
                if (tooltip) tooltip.classList.add('dismissed');
                sessionStorage.setItem(STORAGE_STATUS_KEY, 'true');
                setTimeout(() => {
                    input.focus();
                    scrollToBottom();
                }, 200);
            }
        }

        trigger.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        // Ocultar tooltip tras 8 segundos automáticamente
        setTimeout(() => {
            if (tooltip) tooltip.classList.add('dismissed');
        }, 8000);

        // Reiniciar chat
        resetBtn.addEventListener('click', () => {
            sessionStorage.removeItem(STORAGE_KEY);
            const chatBody = document.getElementById('saito-chat-body');
            chatBody.innerHTML = '';
            showFlow('main');
        });

        // Envío de mensaje escrito por el usuario
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;

            input.value = '';
            handleUserMessage(text);
        });
    }

    // Renderizar mensaje del usuario
    function appendUserMessage(text) {
        const chatBody = document.getElementById('saito-chat-body');
        const msgDiv = document.createElement('div');
        msgDiv.className = 'saito-msg saito-msg-user';
        msgDiv.innerHTML = `
            <div class="saito-msg-bubble">${escapeHTML(text)}</div>
            <span class="saito-msg-time">${getCurrentTime()}</span>
        `;
        chatBody.appendChild(msgDiv);
        scrollToBottom();
    }

    // Renderizar mensaje del bot con efecto de escritura
    function appendBotMessage(text, options = [], callback) {
        const chatBody = document.getElementById('saito-chat-body');

        // Indicador de "Escribiendo..."
        const typingEl = document.createElement('div');
        typingEl.className = 'saito-typing-indicator';
        typingEl.innerHTML = `
            <span class="saito-typing-dot"></span>
            <span class="saito-typing-dot"></span>
            <span class="saito-typing-dot"></span>
        `;
        chatBody.appendChild(typingEl);
        scrollToBottom();

        setTimeout(() => {
            if (typingEl.parentNode) {
                typingEl.remove();
            }

            const msgDiv = document.createElement('div');
            msgDiv.className = 'saito-msg saito-msg-bot';

            let optionsHTML = '';
            if (options && options.length > 0) {
                optionsHTML = `
                    <div class="saito-quick-replies">
                        ${options.map((opt, i) => `
                            <button type="button" class="saito-chip-btn ${opt.isWhatsapp ? 'whatsapp-action' : ''}" data-action="${opt.action}">
                                ${opt.isWhatsapp ? '<i class="fa-brands fa-whatsapp"></i> ' : ''}${opt.text}
                            </button>
                        `).join('')}
                    </div>
                `;
            }

            msgDiv.innerHTML = `
                <div class="saito-msg-bubble">${text}</div>
                ${optionsHTML}
                <span class="saito-msg-time">${getCurrentTime()}</span>
            `;

            chatBody.appendChild(msgDiv);

            // Asignar eventos a las opciones rápidas generadas
            const chips = msgDiv.querySelectorAll('.saito-chip-btn');
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    const action = chip.getAttribute('data-action');
                    handleChipAction(action, chip.textContent.trim());
                });
            });

            scrollToBottom();
            saveChatHistory();
            if (callback) callback();
        }, 450);
    }

    // Manejar acciones de los botones rápidos
    function handleChipAction(action, label) {
        // Acciones que abren enlaces directos
        if (action === 'go_bodas') {
            window.location.href = 'bodas.html';
            return;
        }

        if (action === 'go_projects') {
            if (window.location.pathname.includes('bodas.html')) {
                window.location.href = 'index.html#photography';
            } else {
                const el = document.getElementById('photography') || document.getElementById('toolkit');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        // Acciones de WhatsApp
        if (action === 'flow_whatsapp') {
            openWhatsApp("Hola René, vengo desde tu portafolio y me gustaría platicar contigo.");
            return;
        }
        if (action === 'wa_boda') {
            openWhatsApp("Hola René, me interesa conocer tus paquetes y disponibilidad para fotografía de boda.");
            return;
        }
        if (action === 'wa_web') {
            openWhatsApp("Hola René, tengo la idea para un proyecto web y me gustaría cotizar contigo.");
            return;
        }
        if (action === 'wa_quote') {
            openWhatsApp("Hola René, me gustaría solicitar una cotización para un proyecto.");
            return;
        }
        if (action === 'wa_city') {
            openWhatsApp("Hola René, me gustaría consultar la disponibilidad para un evento en mi ciudad.");
            return;
        }

        // Mostrar como mensaje del usuario la opción elegida
        appendUserMessage(label);

        // Flujos existentes
        if (BOT_FLOWS[action]) {
            showFlow(action);
        } else {
            showFlow('main');
        }
    }

    // Manejar mensaje de texto libre ingresado por el usuario
    function handleUserMessage(text) {
        appendUserMessage(text);
        const lower = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Buscar coincidencia de regla
        let matchedRule = null;
        for (const rule of KEYWORD_RULES) {
            const matches = rule.keywords.some(keyword => lower.includes(keyword));
            if (matches) {
                matchedRule = rule;
                break;
            }
        }

        if (matchedRule) {
            if (matchedRule.flow) {
                showFlow(matchedRule.flow);
            } else if (matchedRule.response) {
                appendBotMessage(matchedRule.response.text, matchedRule.response.options);
            }
        } else {
            // Respuesta por defecto con derivación a WhatsApp
            appendBotMessage(
                "Gracias por tu mensaje. Para ofrecerte una respuesta personalizada y detallada sobre tu requerimiento, ¿te gustaría que lo revisemos directamente por WhatsApp con René?",
                [
                    { text: "💬 Hablar por WhatsApp", action: "flow_whatsapp", isWhatsapp: true },
                    { text: "Ver Paquetes de Boda", action: "flow_bodas" },
                    { text: "Ver Desarrollo Web", action: "flow_web" },
                    { text: "⬅️ Menú Principal", action: "main" }
                ]
            );
        }
    }

    // Mostrar un flujo determinado
    function showFlow(flowName) {
        const flow = BOT_FLOWS[flowName] || BOT_FLOWS.main;
        appendBotMessage(flow.text, flow.options);
    }

    // Abrir WhatsApp con mensaje codificado
    function openWhatsApp(message) {
        // Abrir en nueva pestaña
        window.open(WHATSAPP_BASE_URL, '_blank', 'noopener,noreferrer');
        appendBotMessage(
            `¡Perfecto! Te hemos redirigido a WhatsApp. Si no se abrió la ventana, puedes <a href="${WHATSAPP_BASE_URL}" target="_blank" rel="noopener" style="color: var(--primary); font-weight: 700; text-decoration: underline;">hacer clic aquí</a>.<br><br>¿Hay algo más en lo que pueda orientarte?`,
            [
                { text: "⬅️ Menú Principal", action: "main" }
            ]
        );
    }

    // Helpers
    function scrollToBottom() {
        const chatBody = document.getElementById('saito-chat-body');
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function saveChatHistory() {
        try {
            const chatBody = document.getElementById('saito-chat-body');
            if (chatBody) {
                sessionStorage.setItem(STORAGE_KEY, chatBody.innerHTML);
            }
        } catch (e) {
            // Manejar error silenciosamente si el almacenamiento está restringido
        }
    }

    function loadHistoryOrInitial() {
        const chatBody = document.getElementById('saito-chat-body');
        const saved = sessionStorage.getItem(STORAGE_KEY);
        const wasOpened = sessionStorage.getItem(STORAGE_STATUS_KEY);

        if (wasOpened) {
            const badge = document.getElementById('saito-chat-badge');
            const tooltip = document.getElementById('saito-chat-tooltip');
            if (badge) badge.classList.add('hidden');
            if (tooltip) tooltip.classList.add('dismissed');
        }

        if (saved && saved.trim().length > 0) {
            chatBody.innerHTML = saved;
            // Reactivar listeners de botones en el historial restaurado
            const chips = chatBody.querySelectorAll('.saito-chip-btn');
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    const action = chip.getAttribute('data-action');
                    handleChipAction(action, chip.textContent.trim());
                });
            });
            scrollToBottom();
        } else {
            showFlow('main');
        }
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
