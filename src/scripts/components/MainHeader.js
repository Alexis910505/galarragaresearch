 /**
 * MainHeader Component
 * Componente reutilizable para el header de la página principal
 * 
 * @author Galarraga Research Team
 * @version 3.0.0 - Sin enlaces de navegación
 */
class MainHeader {
    /**
     * Constructor del componente MainHeader
     * @param {string} containerId - ID del contenedor donde se renderizará el header
     * @param {Object} options - Opciones de configuración del header
     * @param {Object} options.logo - Configuración del logo
     * @param {Array} options.links - Array de enlaces de navegación
     */
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = this.mergeWithDefaults(options);
        this.container = null;
        this.isInitialized = false;
    }

    /**
     * Fusiona las opciones proporcionadas con los valores por defecto
     * @param {Object} options - Opciones proporcionadas
     * @returns {Object} Opciones fusionadas
     */
    mergeWithDefaults(options) {
        const defaults = {
            logo: {
                text: 'Galarraga Research',
                href: 'index.html#inicio',
                icon: this.getDefaultLogo(),
                translateKey: 'header.logo'
            },
            links: [
                { text: 'Inicio', href: '#inicio', translateKey: 'header.navigation.home' },
                { text: 'Buscar', href: '#buscar', translateKey: 'header.navigation.search' },
                { text: 'Contacto', href: '#contacto', translateKey: 'header.navigation.contact' }
            ]
        };

        return {
            logo: { ...defaults.logo, ...options.logo },
            links: options.links || defaults.links
        };
    }

    /**
     * Obtiene el logo SVG por defecto
     * @returns {string} SVG del logo
     */
    getDefaultLogo() {
        return `
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 26C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" fill="currentColor"/>
                <path d="M16 8c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" fill="currentColor"/>
                <path d="M16 12c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" fill="currentColor"/>
            </svg>
        `;
    }

    /**
     * Inicializa el componente automáticamente
     * @returns {boolean} true si se inicializó correctamente
     */
    init() {
        console.log('🔧 MainHeader v3.0.0: Inicializando automáticamente');
        try {
            this.container = document.getElementById(this.containerId);
            if (!this.container) {
                console.error(`MainHeader: No se encontró el contenedor con ID "${this.containerId}"`);
                return false;
            }

            this.render();
            this.bindEvents();
            this.attachLanguageToggle();
            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('MainHeader: Error durante la inicialización:', error);
            return false;
        }
    }


    /**
     * Renderiza el HTML del header
     */
    render() {
        this.container.innerHTML = this.generateHTML();
    }

    /**
     * Genera el HTML del header
     * @returns {string} HTML del header
     */
    generateHTML() {
        return `
            <header class="header">
                <div class="container">
                    <div class="header__container">
                        <a href="${this.options.logo.href}" class="header__logo">
                            ${this.options.logo.icon}
                            <span class="header__logo-text" ${this.options.logo.translateKey ? `data-translate="${this.options.logo.translateKey}"` : ''}>${this.options.logo.text}</span>
                        </a>
                        
                        <nav class="header__nav header-alignment">
                            <ul class="header__nav-list">
                                ${this.renderLinks()}
                            </ul>
                        </nav>
                        
                        <div class="header__actions">
                            <button class="header__language-toggle" aria-label="Cambiar idioma" title="Cambiar idioma">
                                <span class="header__language-icon">🌐</span>
                                <span class="header__language-text">ES</span>
                            </button>
                            
                            <button class="header__mobile-toggle" aria-label="Abrir menú de navegación">
                                <span class="header__mobile-toggle-line"></span>
                                <span class="header__mobile-toggle-line"></span>
                                <span class="header__mobile-toggle-line"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    /**
     * Renderiza los enlaces de navegación
     * @returns {string} HTML de los enlaces
     */
    renderLinks() {
        return this.options.links.map(link => `
            <li class="header__nav-item">
                <a href="${link.href}" 
                   class="header__nav-link ${link.current ? 'header__nav-link--current' : ''}"
                   ${link.current ? 'aria-current="page"' : ''}
                   ${link.translateKey ? `data-translate="${link.translateKey}"` : ''}>
                    ${link.text}
                </a>
            </li>
        `).join('');
    }

    /**
     * Vincula los eventos del componente
     */
    bindEvents() {
        this.bindMobileToggle();
        this.bindSmoothScroll();
        this.bindLanguageToggle();
    }

    /**
     * Vincula el evento del botón móvil
     */
    bindMobileToggle() {
        const toggleButton = this.container.querySelector('.header__mobile-toggle');
        const nav = this.container.querySelector('.header__nav');
        
        if (toggleButton && nav) {
            toggleButton.addEventListener('click', () => {
                this.toggleMobileMenu(toggleButton, nav);
            });
        }
    }

    /**
     * Alterna el menú móvil
     * @param {HTMLElement} button - Botón del toggle
     * @param {HTMLElement} nav - Elemento de navegación
     */
    toggleMobileMenu(button, nav) {
        const isOpen = nav.classList.contains('header__nav--open');
        
        if (isOpen) {
            nav.classList.remove('header__nav--open');
            button.classList.remove('header__mobile-toggle--open');
            button.setAttribute('aria-label', 'Abrir menú de navegación');
            button.setAttribute('aria-expanded', 'false');
        } else {
            nav.classList.add('header__nav--open');
            button.classList.add('header__mobile-toggle--open');
            button.setAttribute('aria-label', 'Cerrar menú de navegación');
            button.setAttribute('aria-expanded', 'true');
        }
    }

    /**
     * Vincula el scroll suave para enlaces internos
     */
    bindSmoothScroll() {
        const internalLinks = this.container.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    this.smoothScrollTo(href);
                }
            });
        });
    }

    /**
     * Realiza scroll suave a un elemento
     * @param {string} targetId - ID del elemento objetivo
     */
    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Vincula el evento del botón de cambio de idioma
     */
    bindLanguageToggle() {
        const languageToggle = this.container.querySelector('.header__language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }

    /**
     * Cambia el idioma de la página
     */
    toggleLanguage() {
        if (window.i18n) {
            const newLang = window.i18n.toggleLanguage();
            
            // Actualizar el texto del botón
            const languageText = this.container.querySelector('.header__language-text');
            if (languageText) {
                languageText.textContent = newLang.toUpperCase();
            }
            
            console.log(`Idioma cambiado a: ${newLang}`);
        } else {
            console.warn('⚠️ Librería i18n no está disponible');
            // Fallback: cambiar manualmente
            this.toggleLanguageFallback();
        }
    }

    /**
     * Fallback para cambio de idioma si i18n no está disponible
     */
    toggleLanguageFallback() {
        const currentLang = document.documentElement.lang || 'es';
        const newLang = currentLang === 'es' ? 'en' : 'es';
        
        // Actualizar el texto del botón
        const languageText = this.container.querySelector('.header__language-text');
        if (languageText) {
            languageText.textContent = newLang.toUpperCase();
        }
        
        // Actualizar el atributo lang del documento
        document.documentElement.lang = newLang;
        
        console.log(`Idioma cambiado a: ${newLang} (fallback)`);
    }

    /**
     * Muestra una notificación de cambio de idioma
     * @param {string} lang - Nuevo idioma
     */
    showLanguageNotification(lang) {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.textContent = window.translationManager ? 
            window.translationManager.t('notification.language-changed') : 
            (lang === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English');
        
        // Agregar animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 3000);
    }

    /**
     * Destruye el componente y limpia los eventos
     */
    destroy() {
        if (this.isInitialized) {
            // Limpiar eventos si es necesario
            this.isInitialized = false;
        }
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MainHeader = MainHeader;
}

// Auto-inicialización automática - no requiere inicialización manual
(function() {
    function initHeaders() {
        const containers = document.querySelectorAll('#main-header');
        containers.forEach(container => {
            if (!container.hasAttribute('data-initialized')) {
                const header = new MainHeader(container.id);
                if (header.init()) {
                    container.setAttribute('data-initialized', 'true');
                    console.log(`✅ MainHeader auto-inicializado en ${container.id}`);
                }
            }
        });
    }

    // Inicializar inmediatamente si el DOM está listo, o esperar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaders);
    } else {
        initHeaders();
    }
})();