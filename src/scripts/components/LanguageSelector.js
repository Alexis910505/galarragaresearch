/**
 * Language Selector Component
 * Professional language selector with dropdown
 */

import { LANGUAGES } from '../config/languages.js';

export class LanguageSelector {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            showFlags: true,
            showNames: true,
            showNativeNames: false,
            dropdown: true,
            ...options
        };
        this.isOpen = false;
        this.currentLanguage = window.translationManager?.getCurrentLanguage() || 'es';
        
        this.init();
    }

    /**
     * Inicializa el selector de idioma
     */
    init() {
        this.render();
        this.bindEvents();
        this.subscribeToLanguageChanges();
    }

    /**
     * Renderiza el selector de idioma
     */
    render() {
        const currentLang = LANGUAGES[this.currentLanguage];
        
        this.container.innerHTML = `
            <div class="language-selector ${this.options.dropdown ? 'language-selector--dropdown' : ''}">
                <button class="language-selector__button" aria-label="Select language" aria-expanded="false">
                    <span class="language-selector__current">
                        ${this.options.showFlags ? `<span class="language-selector__flag">${currentLang.flag}</span>` : ''}
                        <span class="language-selector__text">${this.getDisplayText(currentLang)}</span>
                    </span>
                    ${this.options.dropdown ? '<span class="language-selector__arrow">▼</span>' : ''}
                </button>
                
                ${this.options.dropdown ? this.renderDropdown() : ''}
            </div>
        `;
    }

    /**
     * Renderiza el dropdown de idiomas
     */
    renderDropdown() {
        const languages = Object.values(LANGUAGES);
        
        return `
            <div class="language-selector__dropdown" role="menu" aria-hidden="true">
                ${languages.map(lang => `
                    <button 
                        class="language-selector__option ${lang.code === this.currentLanguage ? 'language-selector__option--active' : ''}"
                        data-language="${lang.code}"
                        role="menuitem"
                    >
                        ${this.options.showFlags ? `<span class="language-selector__flag">${lang.flag}</span>` : ''}
                        <span class="language-selector__text">${this.getDisplayText(lang)}</span>
                    </button>
                `).join('')}
            </div>
        `;
    }

    /**
     * Obtiene el texto a mostrar para un idioma
     * @param {Object} lang - Información del idioma
     * @returns {string} Texto a mostrar
     */
    getDisplayText(lang) {
        if (this.options.showNativeNames) {
            return lang.nativeName;
        } else if (this.options.showNames) {
            return lang.name;
        } else {
            return lang.code.toUpperCase();
        }
    }

    /**
     * Vincula los eventos del selector
     */
    bindEvents() {
        const button = this.container.querySelector('.language-selector__button');
        const dropdown = this.container.querySelector('.language-selector__dropdown');
        const options = this.container.querySelectorAll('.language-selector__option');

        // Evento del botón principal
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });
        }

        // Eventos de las opciones
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const language = option.dataset.language;
                this.selectLanguage(language);
                this.closeDropdown();
            });
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.closeDropdown();
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeDropdown();
            }
        });
    }

    /**
     * Suscribe a cambios de idioma
     */
    subscribeToLanguageChanges() {
        if (window.translationManager) {
            window.translationManager.subscribe((data) => {
                if (data.type === 'languageChanged') {
                    this.currentLanguage = data.language;
                    this.updateDisplay();
                }
            });
        }
    }

    /**
     * Alterna el dropdown
     */
    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    /**
     * Abre el dropdown
     */
    openDropdown() {
        const button = this.container.querySelector('.language-selector__button');
        const dropdown = this.container.querySelector('.language-selector__dropdown');
        
        if (button && dropdown) {
            this.isOpen = true;
            button.setAttribute('aria-expanded', 'true');
            dropdown.setAttribute('aria-hidden', 'false');
            dropdown.classList.add('language-selector__dropdown--open');
        }
    }

    /**
     * Cierra el dropdown
     */
    closeDropdown() {
        const button = this.container.querySelector('.language-selector__button');
        const dropdown = this.container.querySelector('.language-selector__dropdown');
        
        if (button && dropdown) {
            this.isOpen = false;
            button.setAttribute('aria-expanded', 'false');
            dropdown.setAttribute('aria-hidden', 'true');
            dropdown.classList.remove('language-selector__dropdown--open');
        }
    }

    /**
     * Selecciona un idioma
     * @param {string} language - Código del idioma
     */
    selectLanguage(language) {
        if (window.translationManager && LANGUAGES[language]) {
            window.translationManager.setLanguage(language);
        }
    }

    /**
     * Actualiza la visualización del idioma actual
     */
    updateDisplay() {
        const currentLang = LANGUAGES[this.currentLanguage];
        const currentElement = this.container.querySelector('.language-selector__current');
        const options = this.container.querySelectorAll('.language-selector__option');
        
        if (currentElement) {
            currentElement.innerHTML = `
                ${this.options.showFlags ? `<span class="language-selector__flag">${currentLang.flag}</span>` : ''}
                <span class="language-selector__text">${this.getDisplayText(currentLang)}</span>
            `;
        }

        // Actualizar opciones activas
        options.forEach(option => {
            if (option.dataset.language === this.currentLanguage) {
                option.classList.add('language-selector__option--active');
            } else {
                option.classList.remove('language-selector__option--active');
            }
        });
    }

    /**
     * Destruye el componente
     */
    destroy() {
        this.container.innerHTML = '';
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.LanguageSelector = LanguageSelector;
}
