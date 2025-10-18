/**
 * Main JavaScript - Funcionalidades de la landing page
 * 
 * Este archivo contiene todas las funcionalidades interactivas de la landing page
 * de investigación médica, incluyendo navegación móvil, efectos de scroll,
 * búsqueda simulada y suscripción de email.
 * 
 * @author Galarraga Research Team
 * @version 1.0.0
 */

// ============================================================================
// CONFIGURACIÓN Y CONSTANTES
// ============================================================================

const CONFIG = {
    search: {
        debounceDelay: 300,
        minQueryLength: 2,
        maxSuggestions: 5
    },
    animations: {
        scrollOffset: 100,
        duration: 300
    },
    email: {
        validationRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
};

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Utilidades para el manejo del DOM y eventos
 */
const DOMUtils = {
    find(selector, parent = document) {
        return parent.querySelector(selector);
    },
    
    findAll(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },
    
    on(element, event, handler, options = {}) {
        if (element) {
            element.addEventListener(event, handler, options);
        }
    },
    
    off(element, event, handler) {
        if (element) {
            element.removeEventListener(event, handler);
        }
    }
};

/**
 * Utilidades para validación
 */
const ValidationUtils = {
    isValidEmail(email) {
        return CONFIG.email.validationRegex.test(email);
    },
    
    isNotEmpty(value) {
        return value && value.trim().length > 0;
    }
};

/**
 * Utilidades para animaciones
 */
const AnimationUtils = {
    smoothScrollTo(element, offset = 0) {
        if (element) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// ============================================================================
// MÓDULOS PRINCIPALES
// ============================================================================

/**
 * Módulo de búsqueda
 */
const SearchModule = {
    init() {
        this.searchInput = DOMUtils.find('#search-input');
        this.suggestions = DOMUtils.find('#search-suggestions');
        this.searchButton = DOMUtils.find('#search-button');
        
        if (this.searchInput) {
            this.bindEvents();
        }
    },

    bindEvents() {
        const debouncedSearch = AnimationUtils.debounce(
            this.handleSearch.bind(this),
            CONFIG.search.debounceDelay
        );

        DOMUtils.on(this.searchInput, 'input', debouncedSearch);
        DOMUtils.on(this.searchInput, 'focus', this.showSuggestions.bind(this));
        DOMUtils.on(this.searchInput, 'blur', this.hideSuggestions.bind(this));
        
        if (this.searchButton) {
            DOMUtils.on(this.searchButton, 'click', this.performSearch.bind(this));
        }
    },

    handleSearch(event) {
        const query = event.target.value.trim();
        
        if (query.length >= CONFIG.search.minQueryLength) {
            this.showSuggestions(query);
        } else {
            this.hideSuggestions();
        }
    },

    showSuggestions(query = '') {
        if (!this.suggestions) return;

        const suggestions = this.getSuggestions(query);
        
        if (suggestions.length > 0) {
            this.suggestions.innerHTML = suggestions
                .map(suggestion => `
                    <li class="search-suggestion">
                        <a href="#" class="search-suggestion__link" data-query="${suggestion}">
                            ${suggestion}
                        </a>
                    </li>
                `).join('');
            
            this.suggestions.classList.add('search-suggestions--visible');
            this.bindSuggestionEvents();
        } else {
            this.hideSuggestions();
        }
    },

    hideSuggestions() {
        if (this.suggestions) {
            this.suggestions.classList.remove('search-suggestions--visible');
        }
    },

    getSuggestions(query) {
        const allSuggestions = [
            'diabetes', 'cáncer', 'COVID-19', 'cardiología', 'pediatría',
            'neurología', 'oncología', 'dermatología', 'ginecología', 'traumatología'
        ];
        
        return allSuggestions
            .filter(suggestion => 
                suggestion.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, CONFIG.search.maxSuggestions);
    },

    bindSuggestionEvents() {
        const suggestionLinks = DOMUtils.findAll('.search-suggestion__link', this.suggestions);
        
        suggestionLinks.forEach(link => {
            DOMUtils.on(link, 'click', (e) => {
                e.preventDefault();
                const query = link.dataset.query;
                this.searchInput.value = query;
                this.performSearch();
                this.hideSuggestions();
            });
        });
    },

    performSearch() {
        const query = this.searchInput.value.trim();
        
        if (query) {
            this.showSearchResults(query);
        }
    },

    showSearchResults(query) {
        console.log(`Buscando: ${query}`);
        this.showToast(`Búsqueda realizada: "${query}"`);
    },

    showToast(message) {
        console.log(`Toast: ${message}`);
    }
};

/**
 * Módulo de suscripción por email
 */
const EmailModule = {
    init() {
        this.emailForm = DOMUtils.find('#email-form');
        this.emailInput = DOMUtils.find('#email-input');
        this.submitButton = DOMUtils.find('#email-submit');
        
        if (this.emailForm) {
            this.bindEvents();
        }
    },

    bindEvents() {
        DOMUtils.on(this.emailForm, 'submit', this.handleSubmit.bind(this));
        DOMUtils.on(this.emailInput, 'input', this.handleInput.bind(this));
    },

    handleSubmit(event) {
        event.preventDefault();
        
        const email = this.emailInput.value.trim();
        
        if (this.validateEmail(email)) {
            this.subscribeEmail(email);
        } else {
            this.showError('Por favor, ingresa un email válido');
        }
    },

    handleInput() {
        this.clearError();
    },

    validateEmail(email) {
        return ValidationUtils.isValidEmail(email);
    },

    subscribeEmail(email) {
        this.showSuccess(`¡Gracias! Te has suscrito con: ${email}`);
        this.emailInput.value = '';
    },

    showError(message) {
        this.showMessage(message, 'error');
    },

    showSuccess(message) {
        this.showMessage(message, 'success');
    },

    showMessage(message, type) {
        console.log(`${type.toUpperCase()}: ${message}`);
    },

    clearError() {
        // Limpiar mensajes de error
    }
};

/**
 * Módulo de scroll y animaciones
 */
const ScrollModule = {
    init() {
        this.bindScrollEvents();
        this.bindIntersectionObserver();
    },

    bindScrollEvents() {
        DOMUtils.on(window, 'scroll', 
            AnimationUtils.debounce(this.handleScroll.bind(this), 16)
        );
    },

    handleScroll() {
        this.updateHeaderOnScroll();
        this.animateCounters();
    },

    updateHeaderOnScroll() {
        const header = DOMUtils.find('.header');
        if (header) {
            const scrolled = window.scrollY > 50;
            header.classList.toggle('header--scrolled', scrolled);
        }
    },

    animateCounters() {
        const counters = DOMUtils.findAll('.counter');
        
        counters.forEach(counter => {
            if (this.isElementInViewport(counter)) {
                this.animateCounter(counter);
            }
        });
    },

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    animateCounter(element) {
        if (element.dataset.animated === 'true') return;
        
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                element.dataset.animated = 'true';
                clearInterval(timer);
            }
        }, 16);
    },

    bindIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1
            });

            const animatedElements = DOMUtils.findAll('.animate-on-scroll');
            animatedElements.forEach(el => observer.observe(el));
        }
    }
};

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

/**
 * Inicializa todos los módulos cuando el DOM esté listo
 */
function init() {
    try {
        SearchModule.init();
        EmailModule.init();
        ScrollModule.init();
        
        console.log('✅ Aplicación inicializada correctamente');
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    DOMUtils.on(document, 'DOMContentLoaded', init);
} else {
    init();
}

// Exportar para uso global si es necesario
if (typeof window !== 'undefined') {
    window.GalarragaResearch = {
        SearchModule,
        EmailModule,
        ScrollModule,
        DOMUtils,
        ValidationUtils,
        AnimationUtils
    };
}

// ============================================================================
// COMPONENTES (Mantenido para compatibilidad)
// ============================================================================

/**
 * MainHeader Component
 * Componente reutilizable para el header de la página principal
 * Basado en el header original con HTML exacto
 */
class MainHeader {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            logo: {
                text: 'Galarraga Research',
                href: 'index.html#inicio',
                icon: this.getDefaultLogo()
            },
            links: [
                { text: 'Inicio', href: 'index.html#inicio' },
                { text: 'Buscar', href: 'index.html#buscar' },
                { text: 'Contacto', href: 'index.html#contacto' },
                { text: 'Derechos del Paciente', href: 'derechos-paciente.html', current: false },
                { text: 'Detección de Plomo', href: 'lead-screening.html' }
            ],
            showMobileMenu: true,
            ...options
        };
        
        this.init();
    }

    getDefaultLogo() {
        return `<svg class="header__logo-icon" width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
        </svg>`;
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`MainHeader: Container with id "${this.containerId}" not found`);
            return;
        }

        this.render(container);
        this.attachEventListeners();
        
        // Forzar re-render después de un pequeño delay para asegurar que el CSS se aplique
        setTimeout(() => {
            this.forceRerender(container);
        }, 100);
    }
    
    forceRerender(container) {
        // Forzar re-render para asegurar que el CSS de alineación se aplique
        const navList = container.querySelector('.header__nav-list');
        if (navList) {
            // Aplicar estilos inline directamente
            navList.style.height = '60px';
            navList.style.display = 'flex';
            navList.style.alignItems = 'center';
            navList.style.margin = '0';
            navList.style.padding = '0';
            
            // Aplicar estilos a todos los li
            const navItems = navList.querySelectorAll('li');
            navItems.forEach(li => {
                li.style.height = '60px';
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.margin = '0';
                li.style.padding = '0';
                li.style.verticalAlign = 'middle';
            });
            
            // Aplicar estilos a todos los links
            const navLinks = navList.querySelectorAll('.header__nav-link');
            navLinks.forEach(link => {
                link.style.height = '60px';
                link.style.display = 'flex';
                link.style.alignItems = 'center';
                link.style.justifyContent = 'center';
                link.style.margin = '0';
                link.style.padding = '0 16px';
                link.style.verticalAlign = 'middle';
                link.style.lineHeight = '1';
                link.style.whiteSpace = 'nowrap';
            });
        }
    }

    render(container) {
        container.innerHTML = `
            <header class="header" role="banner">
                <div class="header__container">
                    <a href="${this.options.logo.href}" class="header__logo" aria-label="${this.options.logo.text} - Inicio">
                        ${this.options.logo.icon}
                        <span class="header__logo-text">${this.options.logo.text}</span>
                    </a>
                    
                    <nav class="header__nav header-alignment" role="navigation" aria-label="Navegación principal">
                        <ul class="header__nav-list" role="menubar">
                            ${this.renderLinks()}
                        </ul>
                    </nav>
                    
                    <button class="header__mobile-toggle" aria-label="Abrir menú de navegación" aria-expanded="false">
                        <span class="header__mobile-toggle-line"></span>
                        <span class="header__mobile-toggle-line"></span>
                        <span class="header__mobile-toggle-line"></span>
                    </button>
                </div>
            </header>
        `;
    }

    renderLinks() {
        return this.options.links.map(link => `
            <li role="none">
                <a href="${link.href}" class="header__nav-link" role="menuitem" ${link.current ? 'aria-current="page"' : ''}>${link.text}</a>
            </li>
        `).join('');
    }

    attachEventListeners() {
        // Mobile menu toggle
        const hamburger = document.querySelector('.header__mobile-toggle');
        if (hamburger) {
            hamburger.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', this.handleAnchorClick.bind(this));
        });
    }

    toggleMobileMenu() {
        const hamburger = document.querySelector('.header__mobile-toggle');
        const nav = document.querySelector('.header__nav');
        
        if (hamburger && nav) {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('header__nav--open');
        }
    }

    handleAnchorClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    // Método para actualizar los enlaces dinámicamente
    updateLinks(newLinks) {
        this.options.links = newLinks;
        const navList = document.querySelector('.header__nav-list');
        if (navList) {
            navList.innerHTML = this.renderLinks();
        }
    }

    // Método para marcar el enlace activo
    setActiveLink(href) {
        const links = document.querySelectorAll('.header__nav-link');
        links.forEach(link => {
            link.classList.remove('header__nav-link--active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === href) {
                link.classList.add('header__nav-link--active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
}

// ============================================================================
// INICIALIZACIÓN PRINCIPAL
// ============================================================================

/**
 * Inicializar la aplicación cuando el DOM esté completamente cargado
 * Este es el punto de entrada principal de la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Galarraga Research - Landing Page de Investigación Médica');
    
    // Inicializar todas las funcionalidades de la página
    initMobileMenu();      // Menú hamburguesa para móviles
    initScrollEffects();   // Efectos de scroll y navegación suave
    initSearchDemo();      // Funcionalidad de búsqueda simulada
    initEmailSignup();     // Formulario de suscripción de email
});

// ============================================================================
// NAVEGACIÓN MÓVIL
// ============================================================================

/**
 * Inicializar el menú hamburguesa para dispositivos móviles
 * 
 * Funcionalidades:
 * - Toggle del menú al hacer clic en el botón hamburguesa
 * - Cerrar menú automáticamente al hacer clic en enlaces
 * - Animaciones CSS para transiciones suaves
 */
function initMobileMenu() {
    // Obtener referencias a los elementos del menú móvil
    const hamburger = document.querySelector('.header__hamburger');
    const nav = document.querySelector('.header__nav');
    
    // Verificar que los elementos existen antes de agregar event listeners
    if (hamburger && nav) {
        // Toggle del menú al hacer clic en el botón hamburguesa
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('header__hamburger--active');
            nav.classList.toggle('header__nav--active');
        });
        
        // Cerrar menú automáticamente al hacer clic en enlaces de navegación
        const navLinks = document.querySelectorAll('.header__nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('header__hamburger--active');
                nav.classList.remove('header__nav--active');
            });
        });
    }
}

// ============================================================================
// EFECTOS DE SCROLL
// ============================================================================

/**
 * Inicializar efectos de scroll y navegación suave
 * 
 * Funcionalidades:
 * - Header dinámico que cambia al hacer scroll
 * - Navegación suave entre secciones
 * - Cálculo automático de offset para compensar header fijo
 */
function initScrollEffects() {
    // Efecto de header que cambia al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        // Agregar clase 'scrolled' cuando el scroll supera 100px
        if (window.scrollY > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
    
    // Navegación suave para enlaces internos (que empiezan con #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir comportamiento por defecto
            
            // Obtener el elemento destino
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Calcular altura del header para compensar el offset
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20; // 20px de margen adicional
                
                // Scroll suave hacia el elemento destino
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================================
// FUNCIONALIDAD DE BÚSQUEDA
// ============================================================================

/**
 * Inicializar la funcionalidad de búsqueda simulada
 * 
 * Funcionalidades:
 * - Búsqueda al hacer clic en el botón
 * - Búsqueda al presionar Enter en el input
 * - Resultados simulados con datos de ejemplo
 */
function initSearchDemo() {
    // Obtener referencias a los elementos de búsqueda
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search__button');
    
    // Verificar que los elementos existen
    if (searchInput && searchBtn) {
        // Búsqueda al hacer clic en el botón
        searchBtn.addEventListener('click', performSearch);
        
        // Búsqueda al presionar Enter en el campo de texto
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// ============================================================================
// SUSCRIPCIÓN DE EMAIL
// ============================================================================

/**
 * Inicializar el formulario de suscripción de email
 * 
 * Funcionalidades:
 * - Validación del formulario
 * - Simulación de suscripción exitosa
 * - Limpieza del formulario después del envío
 */
function initEmailSignup() {
    // Obtener referencias a los elementos del formulario
    const emailSignup = document.getElementById('email-signup');
    const signupForm = document.querySelector('.signup-form');
    
    // Verificar que el formulario existe
    if (signupForm) {
        // Agregar event listener para el envío del formulario
        signupForm.addEventListener('submit', handleEmailSignup);
    }
}

// ============================================================================
// FUNCIONES DE BÚSQUEDA
// ============================================================================

/**
 * Realizar una búsqueda simulada
 * 
 * Proceso:
 * 1. Obtener el término de búsqueda del input
 * 2. Mostrar estado de carga
 * 3. Simular delay de búsqueda
 * 4. Mostrar resultados simulados
 */
function performSearch() {
    // Obtener referencias a los elementos de búsqueda
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Verificar que los elementos existen
    if (searchInput && searchResults) {
        const query = searchInput.value.trim();
        
        // Solo proceder si hay un término de búsqueda
        if (query) {
            // Mostrar la sección de resultados
            searchResults.classList.add('search__results--visible');
            searchResults.scrollIntoView({ behavior: 'smooth' });
            
            // Mostrar estado de carga con spinner animado
            searchResults.innerHTML = '<div class="search__loading"><div class="search__loading-spinner"></div>Buscando...</div>';
            
            // Simular delay de búsqueda (1 segundo) y luego mostrar resultados
            setTimeout(() => {
                showSearchResults(query);
            }, 1000);
        }
    }
}

/**
 * Mostrar resultados de búsqueda simulados
 * 
 * @param {string} query - Término de búsqueda ingresado por el usuario
 * 
 * Genera resultados simulados con datos de ejemplo de publicaciones médicas
 * que incluyen revistas científicas reconocidas y autores ficticios.
 */
function showSearchResults(query) {
    const searchResults = document.getElementById('search-results');
    
    // Generar HTML con resultados simulados
    searchResults.innerHTML = `
        <div class="search__results-header">
            <h3 class="search__results-title">Resultados de búsqueda para "${query}"</h3>
            <span class="search__results-count">3 resultados</span>
        </div>
        <div class="search__results-grid">
            <!-- Resultado 1: Nature Medicine -->
            <div class="card card--publication">
                <div class="card__header">
                    <span class="card__journal">Nature Medicine</span>
                    <span class="card__date">2024</span>
                </div>
                <h4 class="card__title">Avances en el tratamiento de ${query}</h4>
                <p class="card__description">Nuevos enfoques terapéuticos basados en medicina personalizada para el tratamiento de ${query}...</p>
                <div class="card__authors">Dr. María Galarraga et al.</div>
            </div>
            
            <!-- Resultado 2: The Lancet -->
            <div class="card card--publication">
                <div class="card__header">
                    <span class="card__journal">The Lancet</span>
                    <span class="card__date">2024</span>
                </div>
                <h4 class="card__title">Estudios clínicos en ${query}</h4>
                <p class="card__description">Resultados prometedores de ensayos clínicos fase III para el tratamiento de ${query}...</p>
                <div class="card__authors">Dr. Carlos Galarraga et al.</div>
            </div>
            
            <!-- Resultado 3: JAMA -->
            <div class="card card--publication">
                <div class="card__header">
                    <span class="card__journal">JAMA</span>
                    <span class="card__date">2024</span>
                </div>
                <h4 class="card__title">Revisión sistemática sobre ${query}</h4>
                <p class="card__description">Análisis exhaustivo de la literatura médica actual sobre ${query}...</p>
                <div class="card__authors">Dr. Ana Galarraga et al.</div>
            </div>
        </div>
    `;
}

// ============================================================================
// FUNCIONES DE SUSCRIPCIÓN
// ============================================================================

/**
 * Manejar el envío del formulario de suscripción de email
 * 
 * @param {Event} event - Evento de envío del formulario
 * 
 * Proceso:
 * 1. Prevenir envío por defecto del formulario
 * 2. Obtener el email del formulario
 * 3. Mostrar mensaje de confirmación
 * 4. Limpiar y ocultar el formulario
 */
function handleEmailSignup(event) {
    event.preventDefault(); // Prevenir envío por defecto del formulario
    
    // Obtener el valor del campo email
    const email = event.target.email.value;
    
    // Verificar que se ingresó un email
    if (email) {
        // Simular suscripción exitosa con mensaje de confirmación
        alert(`¡Gracias! Te has suscrito con el email: ${email}\n\nRecibirás alertas sobre nuevos artículos en tu especialidad.`);
        
        // Limpiar el formulario y ocultarlo
        event.target.reset();
        document.getElementById('email-signup').style.display = 'none';
    }
}

// ============================================================================
// FUNCIONES GLOBALES (Disponibles en HTML)
// ============================================================================

/**
 * Función global para navegar a una sección específica
 * 
 * @param {string} sectionId - ID de la sección a la que navegar
 * 
 * Utilizada por los enlaces de navegación en el HTML para
 * proporcionar navegación suave entre secciones.
 */
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Calcular posición considerando la altura del header fijo
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        // Scroll suave hacia la sección
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

/**
 * Función global para realizar búsqueda con término sugerido
 * 
 * @param {string} term - Término de búsqueda sugerido
 * 
 * Utilizada por los botones de sugerencias de búsqueda
 * para llenar automáticamente el campo y realizar la búsqueda.
 */
window.searchSuggestion = function(term) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = term;
        performSearch();
    }
};

/**
 * Función global para mostrar el formulario de suscripción
 * 
 * Utilizada por los botones CTA para mostrar el formulario
 * de suscripción de email y hacer scroll hacia él.
 */
window.showEmailSignup = function() {
    const emailSignup = document.getElementById('email-signup');
    if (emailSignup) {
        emailSignup.style.display = 'block';
        emailSignup.scrollIntoView({ behavior: 'smooth' });
    }
};

// Hacer la función performSearch disponible globalmente
window.performSearch = performSearch;