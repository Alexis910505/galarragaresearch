# Sistema de Traducciones Profesional

## Descripción

Sistema de traducciones modular y escalable para Galarraga Research, diseñado siguiendo las mejores prácticas de desarrollo web profesional.

## Estructura de Archivos

```
src/scripts/
├── config/
│   └── languages.js              # Configuración de idiomas
├── translations/
│   ├── index.js                  # Exportaciones principales
│   ├── es.js                     # Traducciones en español
│   ├── en.js                     # Traducciones en inglés
│   └── README.md                 # Esta documentación
├── components/
│   ├── TranslationManager.js     # Gestor principal de traducciones
│   └── LanguageSelector.js       # Componente selector de idioma
└── examples/
    └── translation-usage.js      # Ejemplos de uso
```

## Características Principales

### ✅ Modularidad
- Traducciones organizadas por módulos
- Fácil mantenimiento y escalabilidad
- Separación clara entre idiomas

### ✅ Funcionalidades Avanzadas
- Interpolación de parámetros
- Suscripción a cambios de idioma
- Persistencia en localStorage
- Verificación de traducciones existentes

### ✅ Accesibilidad
- Soporte para RTL (Right-to-Left)
- Navegación por teclado
- ARIA labels y roles
- Alto contraste

### ✅ Rendimiento
- Carga asíncrona de traducciones
- Caché inteligente
- Actualización selectiva del DOM

## Uso Básico

### 1. Inicialización Automática

El sistema se inicializa automáticamente al cargar la página:

```javascript
// El TranslationManager se crea globalmente
window.translationManager = new TranslationManager();
```

### 2. Obtener Traducciones

```javascript
// Traducción simple
const title = window.translationManager.t('patient-medical-home.title');

// Traducción con parámetros
const welcome = window.translationManager.t('common.welcome', { name: 'Dr. Galarraga' });
```

### 3. Cambiar Idioma

```javascript
// Cambiar a inglés
window.translationManager.setLanguage('en');

// Alternar idioma
const newLang = window.translationManager.toggleLanguage();
```

### 4. Usar en HTML

```html
<!-- Traducción de texto -->
<h1 data-translate="patient-medical-home.title">Título por defecto</h1>

<!-- Traducción de HTML -->
<div data-translate-html="patient-medical-home.subtitle">Subtítulo por defecto</div>

<!-- Traducción de placeholder -->
<input data-translate="common.search" placeholder="Buscar...">

<!-- Traducción de título de página -->
<title data-translate-title="page.title">Título por defecto</title>
```

## Configuración de Idiomas

### Agregar Nuevo Idioma

1. **Actualizar configuración** en `src/scripts/config/languages.js`:

```javascript
export const LANGUAGES = {
    es: { /* ... */ },
    en: { /* ... */ },
    fr: {  // Nuevo idioma
        code: 'fr',
        name: 'Français',
        nativeName: 'Français',
        flag: '🇫🇷',
        direction: 'ltr',
        isRTL: false
    }
};
```

2. **Crear archivo de traducciones** `src/scripts/translations/fr.js`:

```javascript
export const fr = {
    nav: {
        inicio: 'Accueil',
        // ... más traducciones
    }
    // ... otros módulos
};
```

3. **Actualizar exportaciones** en `src/scripts/translations/index.js`:

```javascript
import { fr as frTranslations } from './fr.js';

export const translations = {
    es: esTranslations,
    en: enTranslations,
    fr: frTranslations  // Agregar aquí
};
```

## Estructura de Traducciones

### Organización por Módulos

```javascript
export const es = {
    // Navegación
    nav: {
        inicio: 'Inicio',
        contacto: 'Contacto'
    },
    
    // Páginas específicas
    'patient-medical-home': {
        title: 'Título',
        sections: {
            understanding: {
                title: 'Subtítulo',
                content1: 'Contenido...'
            }
        }
    },
    
    // Elementos comunes
    common: {
        loading: 'Cargando...',
        error: 'Error'
    }
};
```

### Claves de Traducción

- **Punto (.)** para separar niveles: `nav.inicio`
- **Guiones bajos (_)** para palabras compuestas: `patient_centered`
- **Consistencia** en nomenclatura entre idiomas

## Componente Selector de Idioma

### Uso Básico

```javascript
const container = document.getElementById('language-selector');
const selector = new LanguageSelector(container, {
    showFlags: true,      // Mostrar banderas
    showNames: true,      // Mostrar nombres de idiomas
    dropdown: true        // Usar dropdown
});
```

### Opciones de Configuración

```javascript
const options = {
    showFlags: true,           // Mostrar banderas de países
    showNames: true,           // Mostrar nombres en inglés
    showNativeNames: false,    // Mostrar nombres nativos
    dropdown: true             // Usar dropdown en lugar de botón simple
};
```

## API del TranslationManager

### Métodos Principales

| Método | Descripción | Parámetros | Retorno |
|--------|-------------|------------|---------|
| `t(key, params)` | Obtener traducción | `key`: Clave, `params`: Parámetros | `string` |
| `setLanguage(lang)` | Cambiar idioma | `lang`: Código del idioma | `boolean` |
| `toggleLanguage()` | Alternar idioma | - | `string` |
| `subscribe(callback)` | Suscribirse a cambios | `callback`: Función | `Function` |
| `hasTranslation(key)` | Verificar traducción | `key`: Clave | `boolean` |

### Propiedades

| Propiedad | Descripción | Tipo |
|-----------|-------------|------|
| `currentLanguage` | Idioma actual | `string` |
| `isInitialized` | Estado de inicialización | `boolean` |

## Mejores Prácticas

### 1. Nomenclatura de Claves

```javascript
// ✅ Bueno - Descriptivo y consistente
'patient-medical-home.sections.features.title'

// ❌ Malo - Vago y inconsistente
'pmh.feat.title'
```

### 2. Organización de Módulos

```javascript
// ✅ Bueno - Agrupado por funcionalidad
{
    nav: { /* navegación */ },
    footer: { /* footer */ },
    'patient-medical-home': { /* página específica */ }
}

// ❌ Malo - Todo mezclado
{
    'nav-inicio': 'Inicio',
    'footer-desc': 'Descripción',
    'pmh-title': 'Título'
}
```

### 3. Interpolación de Parámetros

```javascript
// ✅ Bueno - Parámetros claros
'common.welcome': 'Bienvenido, {{name}}!'

// ❌ Malo - Parámetros confusos
'common.welcome': 'Bienvenido, {{0}}!'
```

### 4. Manejo de Errores

```javascript
// ✅ Bueno - Verificar antes de usar
if (window.translationManager.hasTranslation('key')) {
    const text = window.translationManager.t('key');
}

// ❌ Malo - Asumir que existe
const text = window.translationManager.t('key'); // Puede fallar
```

## Debugging

### Verificar Traducciones

```javascript
// Obtener todas las claves disponibles
const keys = window.translationManager.getAvailableKeys();
console.log('Claves disponibles:', keys);

// Verificar traducción específica
const exists = window.translationManager.hasTranslation('nav.inicio');
console.log('Existe traducción:', exists);
```

### Logs de Debug

El sistema incluye logs detallados en la consola:

```javascript
// Habilitar logs detallados
localStorage.setItem('debug-translations', 'true');
```

## Migración desde Sistema Anterior

### 1. Actualizar Referencias

```javascript
// ❌ Sistema anterior
const text = window.translationManager.t('patient-medical-home.title');

// ✅ Sistema nuevo (mismo uso, mejor funcionalidad)
const text = window.translationManager.t('patient-medical-home.title');
```

### 2. Migrar Traducciones

```javascript
// ❌ Sistema anterior - plano
'patient-medical-home.title': 'Título'

// ✅ Sistema nuevo - modular
'patient-medical-home': {
    title: 'Título',
    sections: {
        understanding: {
            title: 'Subtítulo'
        }
    }
}
```

## Soporte y Contribución

Para reportar bugs o sugerir mejoras, contactar al equipo de desarrollo de Galarraga Research.

---

**Versión:** 2.0.0  
**Última actualización:** Diciembre 2024  
**Autor:** Centralized Code LLC
