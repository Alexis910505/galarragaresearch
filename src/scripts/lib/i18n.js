/**
 * Sistema de Internacionalización (i18n) para Galarraga Research
 * Librería personalizada para manejo de traducciones
 */

class I18nManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'es';
        this.translations = {};
        this.fallbackLanguage = 'es';
        this.observers = [];
        
        // Cargar traducciones
        this.loadTranslations();
    }

    /**
     * Obtiene el idioma almacenado en localStorage
     */
    getStoredLanguage() {
        try {
            return localStorage.getItem('galarraga-language') || 'es';
        } catch (error) {
            console.warn('No se pudo acceder a localStorage:', error);
            return 'es';
        }
    }

    /**
     * Guarda el idioma en localStorage
     */
    setStoredLanguage(lang) {
        try {
            localStorage.setItem('galarraga-language', lang);
        } catch (error) {
            console.warn('No se pudo guardar en localStorage:', error);
        }
    }

    /**
     * Carga las traducciones desde archivos JSON
     */
    async loadTranslations() {
        try {
            // Intentar cargar desde archivos JSON
            const esResponse = await fetch('src/scripts/translations/es.json');
            if (esResponse.ok) {
                this.translations.es = await esResponse.json();
            } else {
                throw new Error('No se pudo cargar es.json');
            }
            
            const enResponse = await fetch('src/scripts/translations/en.json');
            if (enResponse.ok) {
                this.translations.en = await enResponse.json();
            } else {
                throw new Error('No se pudo cargar en.json');
            }
            
            console.log('✅ Traducciones cargadas correctamente desde archivos JSON');
            
            // Notificar que las traducciones están listas
            this.notifyObservers();
        } catch (error) {
            console.warn('⚠️ Error cargando traducciones desde archivos, usando fallback:', error);
            // Usar traducciones de respaldo
            this.loadFallbackTranslations();
        }
    }

    /**
     * Carga traducciones de respaldo en caso de error
     */
    loadFallbackTranslations() {
        this.translations = {
            es: {
                'common.loading': 'Cargando...',
                'common.error': 'Error',
                'common.success': 'Éxito',
                'header.language': 'Idioma',
                'header.logo': 'Galarraga Research',
                'header.navigation.home': 'Inicio',
                'header.navigation.search': 'Buscar',
                'header.navigation.contact': 'Contacto',
                'header.navigation.patient_rights': 'Derechos del Paciente',
                'header.navigation.lead_screening': 'Detección de Plomo',
                'header.navigation.vip_pcmh': 'VIP PCMH',
                'header.navigation.patient_medical_home': 'Hogar Médico del Paciente',
                'footer.company': 'Galarraga Research',
                'footer.description': 'Accede a investigaciones médicas confiables en un solo lugar',
                'footer.copyright': 'Copyright © 2024 Yolanda A. Galarraga Ramirez MD PA - Todos los derechos reservados',
                'footer.developed': 'Desarrollado por Centralized Code LLC',
                'footer.links.home': 'Inicio',
                'footer.links.search': 'Buscar',
                'footer.links.contact': 'Contacto',
                'footer.links.patient_rights': 'Derechos del Paciente',
                'footer.links.lead_screening': 'Detección de Plomo',
                'footer.links.vip_pcmh': 'VIP PCMH',
                'footer.links.patient_medical_home': 'Hogar Médico del Paciente',
                'patient_medical_home.title': '¿Qué es un Hogar Médico del Paciente?',
                'patient_medical_home.subtitle': 'Descubre cómo el modelo de Hogar Médico del Paciente transforma la prestación de atención médica para brindar atención integral, coordinada y centrada en el paciente.'
            },
            en: {
                'common.loading': 'Loading...',
                'common.error': 'Error',
                'common.success': 'Success',
                'header.language': 'Language',
                'header.logo': 'Galarraga Research',
                'header.navigation.home': 'Home',
                'header.navigation.search': 'Search',
                'header.navigation.contact': 'Contact',
                'header.navigation.patient_rights': 'Patient Rights',
                'header.navigation.lead_screening': 'Lead Screening',
                'header.navigation.vip_pcmh': 'VIP PCMH',
                'header.navigation.patient_medical_home': 'Patient Medical Home',
                'footer.company': 'Galarraga Research',
                'footer.description': 'Access reliable medical research in one place',
                'footer.copyright': 'Copyright © 2024 Yolanda A. Galarraga Ramirez MD PA - All rights reserved',
                'footer.developed': 'Developed by Centralized Code LLC',
                'footer.links.home': 'Home',
                'footer.links.search': 'Search',
                'footer.links.contact': 'Contact',
                'footer.links.patient_rights': 'Patient Rights',
                'footer.links.lead_screening': 'Lead Screening',
                'footer.links.vip_pcmh': 'VIP PCMH',
                'footer.links.patient_medical_home': 'Patient Medical Home',
                'patient_medical_home.title': 'What is a Patient Medical Home?',
                'patient_medical_home.subtitle': 'Discover how the Patient Medical Home model transforms healthcare delivery to provide comprehensive, coordinated, and patient-centered care.'
            }
        };
        
        console.log('✅ Traducciones de respaldo cargadas');
        this.notifyObservers();
    }

    /**
     * Traduce una clave
     */
    t(key, params = {}) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        // Buscar la traducción
        for (const k of keys) {
            if (translation && typeof translation === 'object' && k in translation) {
                translation = translation[k];
            } else {
                // Intentar con idioma de respaldo
                translation = this.translations[this.fallbackLanguage];
                for (const k of keys) {
                    if (translation && typeof translation === 'object' && k in translation) {
                        translation = translation[k];
                    } else {
                        console.warn(`⚠️ Clave de traducción no encontrada: ${key}`);
                        return key;
                    }
                }
                break;
            }
        }

        // Interpolar parámetros
        if (typeof translation === 'string' && Object.keys(params).length > 0) {
            return this.interpolate(translation, params);
        }

        return translation || key;
    }

    /**
     * Interpola parámetros en una cadena
     */
    interpolate(str, params) {
        return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return params[key] || match;
        });
    }

    /**
     * Cambia el idioma
     */
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            this.setStoredLanguage(lang);
            this.notifyObservers();
            return true;
        }
        return false;
    }

    /**
     * Alterna entre idiomas
     */
    toggleLanguage() {
        const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
        this.setLanguage(newLang);
        return newLang;
    }

    /**
     * Obtiene el idioma actual
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Obtiene idiomas disponibles
     */
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }

    /**
     * Suscribe un observador para cambios de idioma
     */
    subscribe(callback) {
        this.observers.push(callback);
        return () => {
            const index = this.observers.indexOf(callback);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        };
    }

    /**
     * Notifica a los observadores del cambio de idioma
     */
    notifyObservers() {
        this.observers.forEach(callback => {
            try {
                callback(this.currentLanguage);
            } catch (error) {
                console.error('Error en observador de idioma:', error);
            }
        });
    }

    /**
     * Actualiza todos los elementos con data-translate
     */
    updatePage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const params = this.getElementParams(element);
            element.textContent = this.t(key, params);
        });

        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.getAttribute('data-translate-title');
            const params = this.getElementParams(element);
            element.title = this.t(key, params);
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const params = this.getElementParams(element);
            element.placeholder = this.t(key, params);
        });
    }

    /**
     * Obtiene parámetros de un elemento
     */
    getElementParams(element) {
        const params = {};
        const dataParams = element.dataset;
        
        Object.keys(dataParams).forEach(key => {
            if (key.startsWith('param')) {
                const paramName = key.replace('param', '').toLowerCase();
                params[paramName] = dataParams[key];
            }
        });
        
        return params;
    }

    /**
     * Inicializa el sistema
     */
    async init() {
        try {
            await this.loadTranslations();
            this.updatePage();
            
            // Actualizar cuando cambie el idioma
            this.subscribe(() => {
                this.updatePage();
            });
            
            console.log('✅ i18n Manager inicializado correctamente');
            return true;
        } catch (error) {
            console.error('❌ Error inicializando i18n Manager:', error);
            return false;
        }
    }
}

// Crear instancia global
window.i18n = new I18nManager();

// Función de inicialización
function initializeI18n() {
    if (window.i18n && typeof window.i18n.init === 'function') {
        window.i18n.init().then(() => {
            console.log('✅ i18n inicializado correctamente');
        }).catch(error => {
            console.error('❌ Error inicializando i18n:', error);
        });
    }
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeI18n);
} else {
    // Si el DOM ya está listo, inicializar inmediatamente
    setTimeout(initializeI18n, 100);
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nManager;
}
