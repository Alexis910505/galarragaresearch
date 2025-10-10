/**
 * Configuración de idiomas para Galarraga Research
 * Define los idiomas disponibles y sus propiedades
 */

export const LANGUAGES = {
    es: {
        code: 'es',
        name: 'Español',
        nativeName: 'Español',
        flag: '🇪🇸',
        direction: 'ltr',
        isRTL: false
    },
    en: {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        direction: 'ltr',
        isRTL: false
    }
};

export const DEFAULT_LANGUAGE = 'es';

export const LANGUAGE_STORAGE_KEY = 'galarraga_research_language';

export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES);
