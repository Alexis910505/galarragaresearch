/**
 * MainFooter Component
 * Componente reutilizable para el footer de la página principal
 * 
 * @author Galarraga Research Team
 * @version 3.0.0 - Sin enlaces de navegación
 */
class MainFooter {
    /**
     * Constructor del componente MainFooter
     * @param {string} containerId - ID del contenedor donde se renderizará el footer
     * @param {Object} options - Opciones de configuración del footer
     * @param {Object} options.logo - Configuración del logo
     * @param {Array} options.links - Array de enlaces de navegación
     * @param {Array} options.socialLinks - Array de enlaces de redes sociales
     * @param {Object} options.copyright - Configuración del copyright
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
                description: 'Accede a investigaciones médicas confiables en un solo lugar.',
                icon: this.getDefaultLogo(),
                translateKey: 'footer.company',
                descriptionTranslateKey: 'footer.description'
            },
            links: [
                { text: 'Inicio', href: '#inicio', translateKey: 'footer.links.home' },
                { text: 'Buscar', href: '#buscar', translateKey: 'footer.links.search' },
                { text: 'Contacto', href: '#contacto', translateKey: 'footer.links.contact' }
            ],
            socialLinks: [
                { name: 'Twitter', href: '#', icon: this.getTwitterIcon() },
                { name: 'LinkedIn', href: '#', icon: this.getLinkedInIcon() },
                { name: 'Facebook', href: '#', icon: this.getFacebookIcon() }
            ],
            copyright: {
                company: 'Yolanda A. Galarraga Ramirez MD PA',
                year: new Date().getFullYear(),
                developer: 'Centralized Code LLC',
                translateKey: 'footer.copyright',
                developerTranslateKey: 'footer.developed'
            }
        };

        return {
            logo: { ...defaults.logo, ...options.logo },
            links: options.links || defaults.links,
            socialLinks: options.socialLinks || defaults.socialLinks,
            copyright: { ...defaults.copyright, ...options.copyright }
        };
    }

    /**
     * Obtiene el logo SVG por defecto
     * @returns {string} SVG del logo
     */
    getDefaultLogo() {
        return `
            <svg class="footer__logo-icon" width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <!-- Fondo amarillo claro -->
                <rect width="100" height="100" fill="#FFF8DC" rx="15"/>
                <!-- Corazón central -->
                <path d="M50 30C50 30, 35 20, 35 35C35 45, 50 60, 50 60C50 60, 65 45, 65 35C65 20, 50 30, 50 30Z" fill="white"/>
                <!-- Huella de mano 1 (arriba-derecha) -->
                <path d="M70 25C70 25, 75 20, 80 25C80 25, 85 30, 80 35C80 35, 75 40, 70 35C70 35, 65 30, 70 25Z" fill="#D2B48C" opacity="0.8"/>
                <!-- Huella de mano 2 (abajo-derecha) -->
                <path d="M70 75C70 75, 75 70, 80 75C80 75, 85 80, 80 85C80 85, 75 90, 70 85C70 85, 65 80, 70 75Z" fill="#D2B48C" opacity="0.8"/>
                <!-- Huella de mano 3 (abajo-izquierda) -->
                <path d="M30 75C30 75, 25 70, 20 75C20 75, 15 80, 20 85C20 85, 25 90, 30 85C30 85, 35 80, 30 75Z" fill="#D2B48C" opacity="0.8"/>
                <!-- Huella de mano 4 (arriba-izquierda) -->
                <path d="M30 25C30 25, 25 20, 20 25C20 25, 15 30, 20 35C20 35, 25 40, 30 35C30 35, 35 30, 30 25Z" fill="#D2B48C" opacity="0.8"/>
            </svg>
        `;
    }

    /**
     * Obtiene el icono SVG de Twitter
     * @returns {string} SVG del icono de Twitter
     */
    getTwitterIcon() {
        return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
        `;
    }

    /**
     * Obtiene el icono SVG de LinkedIn
     * @returns {string} SVG del icono de LinkedIn
     */
    getLinkedInIcon() {
        return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065c0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        `;
    }

    /**
     * Obtiene el icono SVG de Facebook
     * @returns {string} SVG del icono de Facebook
     */
    getFacebookIcon() {
        return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        `;
    }

    /**
     * Inicializa el componente automáticamente
     * @returns {boolean} true si se inicializó correctamente
     */
    init() {
        console.log('🔧 MainFooter v3.0.0: Inicializando automáticamente');
        try {
            this.container = document.getElementById(this.containerId);
            if (!this.container) {
                console.error(`MainFooter: No se encontró el contenedor con ID "${this.containerId}"`);
                return false;
            }

            this.render();
            this.bindEvents();
            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('MainFooter: Error durante la inicialización:', error);
            return false;
        }
    }


    /**
     * Renderiza el HTML del footer
     */
    render() {
        this.container.innerHTML = this.generateHTML();
    }

    /**
     * Genera el HTML del footer
     * @returns {string} HTML del footer
     */
    generateHTML() {
        return `
            <footer class="footer" role="contentinfo">
                <div class="footer__container">
                    <div class="footer__content" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; align-items: start;">
                        ${this.renderLogoSection()}
                        ${this.renderLinksSection()}
                        ${this.renderSocialSection()}
                    </div>
                    ${this.renderCopyrightSection()}
                </div>
            </footer>
        `;
    }

    /**
     * Renderiza la sección del logo
     * @returns {string} HTML de la sección del logo
     */
    renderLogoSection() {
        return `
            <div class="footer__brand">
                <div class="footer__logo">
                    <div class="footer__logo-text">
                        <h3 class="footer__logo-title" ${this.options.logo.translateKey ? `data-translate="${this.options.logo.translateKey}"` : ''}>${this.options.logo.text}</h3>
                        <p class="footer__description" ${this.options.logo.descriptionTranslateKey ? `data-translate="${this.options.logo.descriptionTranslateKey}"` : ''}>${this.options.logo.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza la sección de enlaces
     * @returns {string} HTML de la sección de enlaces
     */
    renderLinksSection() {
        console.log('🔧 MainFooter v3.0.0: Sin enlaces de navegación');
        return `
            <div class="footer__section">
                <h4 class="footer__section-title">Enlaces Rápidos</h4>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${this.renderLinksAsDivs()}
                </div>
            </div>
        `;
    }

    /**
     * Renderiza la sección de redes sociales
     * @returns {string} HTML de la sección de redes sociales
     */
    renderSocialSection() {
        return `
            <div class="footer__section">
                <h4 class="footer__section-title">Redes Sociales</h4>
                <div class="footer__social">
                    ${this.renderSocialLinks()}
                </div>
            </div>
        `;
    }

    /**
     * Renderiza la sección de copyright
     * @returns {string} HTML de la sección de copyright
     */
    renderCopyrightSection() {
        return `
            <div class="footer__bottom">
                <p class="footer__copyright" ${this.options.copyright.translateKey ? `data-translate="${this.options.copyright.translateKey}"` : ''}>Copyright © ${this.options.copyright.year} ${this.options.copyright.company} - Todos los derechos reservados</p>
                <p class="footer__developer" ${this.options.copyright.developerTranslateKey ? `data-translate="${this.options.copyright.developerTranslateKey}"` : ''}>Desarrollado por ${this.options.copyright.developer}</p>
            </div>
        `;
    }

    /**
     * Renderiza los enlaces de navegación
     * @returns {string} HTML de los enlaces
     */
    renderLinks() {
        return this.options.links.map(link => `
            <li>
                <a href="${link.href}" class="footer__links-link" ${link.translateKey ? `data-translate="${link.translateKey}"` : ''}>${link.text}</a>
            </li>
        `).join('');
    }

    renderLinksAsDivs() {
        return this.options.links.map(link => `
            <div>
                <a href="${link.href}" class="footer__links-link" style="font-size: 1rem;" ${link.translateKey ? `data-translate="${link.translateKey}"` : ''}>${link.text}</a>
            </div>
        `).join('');
    }

    /**
     * Renderiza los enlaces de redes sociales
     * @returns {string} HTML de los enlaces sociales
     */
    renderSocialLinks() {
        return this.options.socialLinks.map(social => `
            <a href="${social.href}" class="footer__social-link" aria-label="${social.name}">
                ${social.icon}
            </a>
        `).join('');
    }

    /**
     * Vincula los eventos del componente
     */
    bindEvents() {
        this.bindSmoothScroll();
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
    window.MainFooter = MainFooter;
}

// Auto-inicialización automática - no requiere inicialización manual
(function() {
    function initFooters() {
        const containers = document.querySelectorAll('#main-footer');
        containers.forEach(container => {
            if (!container.hasAttribute('data-initialized')) {
                const footer = new MainFooter(container.id);
                if (footer.init()) {
                    container.setAttribute('data-initialized', 'true');
                    console.log(`✅ MainFooter auto-inicializado en ${container.id}`);
                }
            }
        });
    }

    // Inicializar inmediatamente si el DOM está listo, o esperar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooters);
    } else {
        initFooters();
    }
})();
