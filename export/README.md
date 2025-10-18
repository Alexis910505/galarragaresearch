# Exportación de Vistas Secundarias

Este paquete contiene las vistas secundarias que fueron removidas del proyecto principal `galarragaresearch`.

## Archivos Incluidos

### Páginas HTML
- `derechos-paciente.html` - Declaración de Derechos del Paciente
- `lead-screening.html` - Información sobre Detección de Plomo
- `patient-medical-home.html` - ¿Qué es un Hogar Médico del Paciente?
- `vip-pcmh.html` - Programa VIP PCMH

## Dependencias Compartidas

Estas páginas dependen de los siguientes recursos del proyecto principal:

### Estilos (CSS)
- `src/styles/main.css` - Estilos principales
- `src/styles/base/` - Estilos base (reset, typography, variables)
- `src/styles/components/` - Componentes reutilizables
- `src/styles/layout/` - Layout (header, footer, grid, etc.)
- `src/styles/utilities/` - Utilidades (animations, colors, etc.)

### Scripts (JavaScript)
- `src/scripts/lib/i18n.js` - Librería de internacionalización
- `src/scripts/components/MainHeader.js` - Componente de header
- `src/scripts/components/MainFooter.js` - Componente de footer
- `src/scripts/main.js` - Script principal

### Imágenes
- `src/assets/images/espanol.jpg` - Imagen del flujo en español (usada en vip-pcmh.html)
- `src/assets/images/ingles.jpg` - Imagen del flujo en inglés

### Fuentes
- Google Fonts (Inter) - Cargada vía CDN
- Font Awesome - Cargada vía CDN

## Instrucciones de Migración

### Opción 1: Mover a Otro Proyecto (Recomendado)

1. **Copiar archivos HTML**
   - Copia los 4 archivos HTML a la raíz de tu nuevo proyecto

2. **Copiar estructura de carpetas**
   - Copia toda la carpeta `src/` del proyecto original al nuevo proyecto
   - Esto incluye: `styles/`, `scripts/`, `assets/`

3. **Estructura final del nuevo proyecto**
   ```
   nuevo-proyecto/
   ├── derechos-paciente.html
   ├── lead-screening.html
   ├── patient-medical-home.html
   ├── vip-pcmh.html
   └── src/
       ├── assets/
       │   └── images/
       ├── scripts/
       │   ├── components/
       │   │   ├── MainHeader.js
       │   │   └── MainFooter.js
       │   ├── lib/
       │   │   └── i18n.js
       │   └── main.js
       └── styles/
           ├── base/
           ├── components/
           ├── layout/
           ├── utilities/
           └── main.css
   ```

4. **Actualizar MainHeader.js en el nuevo proyecto**
   - Si quieres que estas páginas tengan navegación entre ellas, actualiza el archivo `src/scripts/components/MainHeader.js`
   - Modifica el array `links` en el método `mergeWithDefaults()` (línea 36) para incluir los enlaces apropiados

### Opción 2: Integrar en Proyecto Existente

1. **Si tu proyecto ya tiene estructura similar**
   - Copia solo los archivos HTML a la ubicación apropiada
   - Verifica que las rutas a `src/` sean correctas en cada archivo HTML

2. **Si tu proyecto tiene diferente estructura**
   - Necesitarás actualizar las rutas en cada archivo HTML:
     - Busca todas las referencias a `src/styles/main.css`
     - Busca todas las referencias a `src/scripts/`
     - Ajusta según la estructura de tu proyecto

## Características de las Páginas

### derechos-paciente.html
- Declaración completa de derechos y responsabilidades del paciente
- Información de contacto para quejas
- Diseño responsive con cards glassmorphic
- Soporte multiidioma (ES/EN)

### lead-screening.html
- Información sobre prevención de envenenamiento por plomo
- Pasos para prevención
- Información de contacto
- Diseño similar al de derechos-paciente.html

### patient-medical-home.html
- Explicación completa del modelo HMP
- Características clave
- Beneficios para pacientes y familias
- Diseño moderno con grid de features

### vip-pcmh.html
- Información del programa VIP PCMH
- Flujo del programa con imagen
- Información de contacto completa
- Horarios de atención

## Notas Importantes

1. **Componentes Auto-inicializables**
   - Los componentes MainHeader y MainFooter se auto-inicializan cuando se carga la página
   - No requieren código adicional de inicialización

2. **Multiidioma**
   - Todas las páginas tienen soporte para español e inglés
   - El cambio de idioma se hace mediante el botón en el header
   - Utiliza la librería i18n.js

3. **Responsive Design**
   - Todas las páginas están optimizadas para dispositivos móviles
   - Breakpoints: 768px y 480px

4. **Dependencias Externas (CDN)**
   - Google Fonts: Inter (300, 400, 500, 600, 700, 800)
   - Font Awesome 6.0.0+

## Mantenimiento

Si necesitas actualizar estos archivos:

1. **Estilos específicos**: Cada página tiene sus propios estilos en la etiqueta `<style>` dentro del `<head>`
2. **Estilos compartidos**: Están en `src/styles/main.css` y sus subdirectorios
3. **Componentes**: MainHeader y MainFooter se pueden actualizar en `src/scripts/components/`

## Contacto

Si tienes preguntas sobre la migración o necesitas ayuda, contacta al equipo de desarrollo.

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0

