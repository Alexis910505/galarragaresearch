/**
 * Ejemplos de uso del sistema de traducciones profesional
 * Galarraga Research
 */

// ============================================================================
// EJEMPLO 1: USO BÁSICO
// ============================================================================

// Obtener una traducción simple
const title = window.translationManager.t('patient-medical-home.title');
console.log('Título:', title);

// Obtener una traducción con parámetros
const welcomeMessage = window.translationManager.t('common.welcome', { name: 'Dr. Galarraga' });
console.log('Mensaje:', welcomeMessage);

// ============================================================================
// EJEMPLO 2: CAMBIO DE IDIOMA
// ============================================================================

// Cambiar a inglés
window.translationManager.setLanguage('en');

// Alternar idioma
const newLanguage = window.translationManager.toggleLanguage();
console.log('Nuevo idioma:', newLanguage);

// ============================================================================
// EJEMPLO 3: SUSCRIPCIÓN A CAMBIOS
// ============================================================================

// Suscribirse a cambios de idioma
const unsubscribe = window.translationManager.subscribe((data) => {
    if (data.type === 'languageChanged') {
        console.log(`Idioma cambiado de ${data.previousLanguage} a ${data.language}`);
        // Actualizar UI personalizada aquí
    }
});

// Desuscribirse cuando ya no se necesite
// unsubscribe();

// ============================================================================
// EJEMPLO 4: USO EN COMPONENTES
// ============================================================================

class MyComponent {
    constructor() {
        this.element = document.getElementById('my-component');
        this.setupTranslation();
    }

    setupTranslation() {
        // Suscribirse a cambios de idioma
        this.unsubscribe = window.translationManager.subscribe((data) => {
            if (data.type === 'languageChanged') {
                this.updateContent();
            }
        });

        // Actualizar contenido inicial
        this.updateContent();
    }

    updateContent() {
        if (this.element) {
            this.element.innerHTML = `
                <h2>${window.translationManager.t('patient-medical-home.title')}</h2>
                <p>${window.translationManager.t('patient-medical-home.subtitle')}</p>
            `;
        }
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

// ============================================================================
// EJEMPLO 5: USO CON ATRIBUTOS DATA-TRANSLATE
// ============================================================================

// HTML con atributos de traducción:
/*
<div data-translate="patient-medical-home.title">Título por defecto</div>
<div data-translate-html="patient-medical-home.subtitle">Subtítulo por defecto</div>
<input data-translate="common.search" placeholder="Buscar...">
*/

// El sistema automáticamente actualizará estos elementos cuando cambie el idioma

// ============================================================================
// EJEMPLO 6: VERIFICACIÓN DE TRADUCCIONES
// ============================================================================

// Verificar si existe una traducción
if (window.translationManager.hasTranslation('patient-medical-home.title')) {
    console.log('La traducción existe');
}

// Obtener todas las claves disponibles
const availableKeys = window.translationManager.getAvailableKeys();
console.log('Claves disponibles:', availableKeys);

// ============================================================================
// EJEMPLO 7: USO DEL SELECTOR DE IDIOMA
// ============================================================================

// Crear un selector de idioma
const languageContainer = document.getElementById('language-selector');
if (languageContainer) {
    const languageSelector = new LanguageSelector(languageContainer, {
        showFlags: true,
        showNames: true,
        dropdown: true
    });
}

// ============================================================================
// EJEMPLO 8: CONFIGURACIÓN AVANZADA
// ============================================================================

// Obtener información del idioma actual
const currentLangInfo = window.translationManager.getCurrentLanguageInfo();
console.log('Información del idioma:', currentLangInfo);

// Obtener todos los idiomas disponibles
const availableLanguages = window.translationManager.getAvailableLanguages();
console.log('Idiomas disponibles:', availableLanguages);

// ============================================================================
// EJEMPLO 9: INTERPOLACIÓN DE PARÁMETROS
// ============================================================================

// En las traducciones, usar {{parametro}}:
// 'common.welcome': 'Bienvenido, {{name}}!'

// Al usar la traducción:
const personalizedWelcome = window.translationManager.t('common.welcome', { 
    name: 'Dr. Galarraga' 
});
console.log('Mensaje personalizado:', personalizedWelcome);

// ============================================================================
// EJEMPLO 10: MANEJO DE ERRORES
// ============================================================================

try {
    const translation = window.translationManager.t('non.existent.key');
    console.log('Traducción:', translation); // Devolverá la clave original
} catch (error) {
    console.error('Error en traducción:', error);
}
