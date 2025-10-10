# Diagrama de Arquitectura - Galarraga Research

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        GALARRAGA RESEARCH                      │
│                     Sitio Web de Investigación Médica          │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │    HTML5    │  │     CSS3    │  │ JavaScript  │            │
│  │  Semántico  │  │   Modular   │  │   ES6+      │            │
│  │ Accesible   │  │   ITCSS     │  │  Modules    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                          APPLICATION LAYER                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │     App     │  │ Navigation  │  │    Form     │            │
│  │  (Singleton)│  │   Module    │  │   Module    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Animation   │  │Notification │  │   Filter    │            │
│  │   Module    │  │   Module    │  │   Module    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                           SERVICE LAYER                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │    API      │  │ Validation  │  │   Storage   │            │
│  │  Service    │  │   Service   │  │   Service   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                            UTILITY LAYER                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │    DOM      │  │ Animation   │  │   Config    │            │
│  │   Utils     │  │   Utils     │  │  Settings   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Estructura de Carpetas Detallada

```
galarragaresearch/
├── 📁 src/                           # 🎯 Código fuente principal
│   ├── 📁 assets/                    # 🖼️ Recursos estáticos
│   │   ├── 📁 images/               # 🖼️ Imágenes del sitio
│   │   ├── 📁 icons/                # 🎨 Iconos y favicons
│   │   └── 📁 fonts/                # 🔤 Fuentes personalizadas
│   │
│   ├── 📁 components/                # 🧩 Componentes HTML reutilizables
│   │
│   ├── 📁 config/                    # ⚙️ Configuración centralizada
│   │   └── 📄 settings.js           # 🔧 Configuración global
│   │
│   ├── 📁 scripts/                   # 💻 JavaScript modular
│   │   ├── 📁 modules/              # 🏗️ Módulos principales
│   │   │   ├── 📄 App.js            # 🎯 Módulo principal (Singleton)
│   │   │   ├── 📄 NavigationModule.js # 🧭 Gestión de navegación
│   │   │   ├── 📄 FormModule.js     # 📝 Gestión de formularios
│   │   │   ├── 📄 AnimationModule.js # ✨ Animaciones y transiciones
│   │   │   ├── 📄 NotificationModule.js # 🔔 Sistema de notificaciones
│   │   │   └── 📄 FilterModule.js   # 🔍 Sistema de filtros
│   │   │
│   │   ├── 📁 services/             # 🔧 Servicios de aplicación
│   │   │   ├── 📄 ApiService.js     # 🌐 Comunicación con API
│   │   │   └── 📄 ValidationService.js # ✅ Validación de datos
│   │   │
│   │   ├── 📁 utils/                # 🛠️ Utilidades generales
│   │   │   ├── 📄 DOMUtils.js       # 🎯 Utilidades DOM
│   │   │   └── 📄 AnimationUtils.js # ✨ Utilidades de animación
│   │   │
│   │   └── 📄 main.js               # 🚀 Punto de entrada principal
│   │
│   └── 📁 styles/                    # 🎨 CSS modular (ITCSS)
│       ├── 📁 base/                 # 🏗️ Estilos base
│       │   ├── 📄 variables.css     # 🎨 Variables del sistema de diseño
│       │   ├── 📄 reset.css         # 🔄 Reset CSS
│       │   └── 📄 typography.css    # 📝 Tipografía base
│       │
│       ├── 📁 components/           # 🧩 Estilos de componentes
│       │   ├── 📄 button.css        # 🔘 Estilos de botones
│       │   ├── 📄 card.css          # 🃏 Estilos de tarjetas
│       │   ├── 📄 form.css          # 📝 Estilos de formularios
│       │   ├── 📄 navigation.css    # 🧭 Estilos de navegación
│       │   ├── 📄 hero.css          # 🦸 Estilos del hero
│       │   ├── 📄 statistics.css    # 📊 Estilos de estadísticas
│       │   ├── 📄 team.css          # 👥 Estilos del equipo
│       │   ├── 📄 publications.css  # 📚 Estilos de publicaciones
│       │   ├── 📄 contact.css       # 📞 Estilos de contacto
│       │   └── 📄 notification.css  # 🔔 Estilos de notificaciones
│       │
│       ├── 📁 layout/               # 🏗️ Layout y estructura
│       │   ├── 📄 container.css     # 📦 Contenedores
│       │   ├── 📄 grid.css          # 🔲 Sistema de grid
│       │   ├── 📄 header.css        # 🏠 Estilos del header
│       │   ├── 📄 footer.css        # 🦶 Estilos del footer
│       │   └── 📄 sections.css      # 📑 Estilos de secciones
│       │
│       ├── 📁 utilities/            # 🛠️ Clases de utilidad
│       │   ├── 📄 spacing.css       # 📏 Espaciado
│       │   ├── 📄 display.css       # 👁️ Display
│       │   ├── 📄 colors.css        # 🎨 Colores
│       │   ├── 📄 animations.css    # ✨ Animaciones
│       │   └── 📄 responsive.css    # 📱 Responsive
│       │
│       └── 📄 main.css              # 🎯 Archivo principal de estilos
│
├── 📁 docs/                         # 📚 Documentación
│   ├── 📄 ARCHITECTURE.md          # 🏗️ Documentación de arquitectura
│   ├── 📄 ARCHITECTURE_DIAGRAM.md  # 📊 Diagramas de arquitectura
│   ├── 📄 COMPONENTS.md            # 🧩 Documentación de componentes
│   └── 📄 API.md                   # 🔌 Documentación de API
│
├── 📁 dist/                         # 📦 Archivos compilados (generado)
│
├── 📄 index.html                    # 🏠 Página principal
├── 📄 package.json                  # 📋 Configuración del proyecto
├── 📄 .gitignore                    # 🚫 Archivos ignorados por Git
└── 📄 README.md                     # 📖 Documentación principal
```

## 🔄 Flujo de Datos

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Usuario   │───▶│   Eventos   │───▶│   Módulos   │
│  (Interactúa)│    │   (DOM)     │    │ (Procesan)  │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                              ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Servicios │◀───│   App.js    │◀───│  Respuesta  │
│ (API, Valid)│    │ (Coordina)  │    │  (Resultado)│
└─────────────┘    └─────────────┘    └─────────────┘
       │
       ▼
┌─────────────┐
│   Utilidades│
│ (DOM, Anim) │
└─────────────┘
```

## 🎨 Sistema de Diseño

```
┌─────────────────────────────────────────────────────────────────┐
│                        DESIGN SYSTEM                           │
├─────────────────────────────────────────────────────────────────┤
│  🎨 Design Tokens                                              │
│  ├── Colores (Primary, Secondary, Accent, Neutral)            │
│  ├── Tipografía (Inter, Escalas, Pesos)                       │
│  ├── Espaciado (Escala 0-32)                                  │
│  ├── Sombras (xs, sm, md, lg, xl)                            │
│  └── Border Radius (sm, base, md, lg, xl, full)              │
├─────────────────────────────────────────────────────────────────┤
│  🧩 Componentes Atómicos                                       │
│  ├── Botones (Primary, Secondary, Outline, Ghost)             │
│  ├── Tarjetas (Default, Stat, Team, Publication)              │
│  ├── Formularios (Input, Select, Textarea, Validation)        │
│  ├── Navegación (Header, Menu, Links)                         │
│  └── Notificaciones (Success, Error, Warning, Info)           │
├─────────────────────────────────────────────────────────────────┤
│  📱 Responsive Design                                          │
│  ├── Mobile First (320px+)                                     │
│  ├── Breakpoints (sm, md, lg, xl, 2xl)                       │
│  ├── Grid System (CSS Grid + Flexbox)                         │
│  └── Componentes Adaptativos                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Patrones de Diseño Implementados

```
┌─────────────────────────────────────────────────────────────────┐
│                    DESIGN PATTERNS                            │
├─────────────────────────────────────────────────────────────────┤
│  🏗️ Creacionales                                               │
│  ├── Singleton (App.js)                                        │
│  └── Factory (Module Creation)                                 │
├─────────────────────────────────────────────────────────────────┤
│  🏛️ Estructurales                                              │
│  ├── Module Pattern (JavaScript)                               │
│  ├── BEM (CSS)                                                 │
│  └── ITCSS (CSS Architecture)                                  │
├─────────────────────────────────────────────────────────────────┤
│  🔄 Comportamentales                                           │
│  ├── Observer (Event System)                                   │
│  ├── Strategy (Validation)                                     │
│  └── Command (Actions)                                         │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Optimizaciones de Performance

```
┌─────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE OPTIMIZATIONS                  │
├─────────────────────────────────────────────────────────────────┤
│  ⚡ CSS                                                         │
│  ├── CSS Modular (ITCSS)                                       │
│  ├── Variables CSS (Design Tokens)                             │
│  ├── Lazy Loading de Fuentes                                   │
│  └── Minificación en Producción                                │
├─────────────────────────────────────────────────────────────────┤
│  ⚡ JavaScript                                                  │
│  ├── Módulos ES6 Nativos                                       │
│  ├── Lazy Loading de Módulos                                   │
│  ├── Event Delegation                                          │
│  └── Throttling y Debouncing                                   │
├─────────────────────────────────────────────────────────────────┤
│  ⚡ HTML                                                        │
│  ├── Estructura Semántica                                      │
│  ├── Atributos de Accesibilidad                                │
│  ├── Meta Tags Optimizados                                     │
│  └── Structured Data (JSON-LD)                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Métricas de Calidad

```
┌─────────────────────────────────────────────────────────────────┐
│                      QUALITY METRICS                          │
├─────────────────────────────────────────────────────────────────┤
│  🎯 Código                                                      │
│  ├── Principios SOLID ✅                                        │
│  ├── Clean Code ✅                                              │
│  ├── DRY (Don't Repeat Yourself) ✅                            │
│  └── KISS (Keep It Simple, Stupid) ✅                          │
├─────────────────────────────────────────────────────────────────┤
│  🎨 Diseño                                                      │
│  ├── BEM Methodology ✅                                         │
│  ├── ITCSS Architecture ✅                                      │
│  ├── Design System ✅                                           │
│  └── Responsive Design ✅                                       │
├─────────────────────────────────────────────────────────────────┤
│  ♿ Accesibilidad                                               │
│  ├── WCAG 2.1 AA Compliance ✅                                 │
│  ├── ARIA Labels ✅                                             │
│  ├── Keyboard Navigation ✅                                     │
│  └── Screen Reader Friendly ✅                                  │
├─────────────────────────────────────────────────────────────────┤
│  🔍 SEO                                                         │
│  ├── Meta Tags Optimizados ✅                                   │
│  ├── Structured Data ✅                                         │
│  ├── Semantic HTML ✅                                           │
│  └── Performance Score 90+ ✅                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

**Esta arquitectura garantiza un código mantenible, escalable y de alta calidad, siguiendo las mejores prácticas de desarrollo web moderno.**
