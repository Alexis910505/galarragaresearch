# 📸 Guía Visual: Habilitar GitHub Pages

## ⚠️ IMPORTANTE: Lee esto primero

El error **"Not Found"** ocurre porque GitHub Pages debe ser habilitado **ANTES** del primer deploy.

Esta guía te muestra exactamente dónde hacer click.

---

## 📋 Paso a Paso con Referencias Visuales

### Paso 1: Abre tu Repositorio en GitHub

1. Abre tu navegador
2. Ve a: `https://github.com/TU-USUARIO/galarragaresearch`
3. Deberías ver la página principal de tu repositorio

```
┌─────────────────────────────────────────────────────────────┐
│  GitHub                                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ TU-USUARIO / galarragaresearch                         │ │
│  └────────────────────────────────────────────────────────┘ │
│  [< > Code] [Issues] [Pull requests] [...] [⚙️ Settings]   │
│                                              👆 AQUÍ        │
└─────────────────────────────────────────────────────────────┘
```

---

### Paso 2: Abre Settings (Configuración)

1. En la barra de navegación **superior** del repositorio
2. Busca el botón **"Settings"** con el icono ⚙️
3. **Click en "Settings"**

**Ubicación:**
```
Barra superior del repositorio:
[Code] [Issues] [Pull requests] [Actions] [Projects] [Wiki] [Security] [Insights] [⚙️ Settings]
                                                                                      👆 CLICK AQUÍ
```

**⚠️ Nota:** Si no ves "Settings", no tienes permisos de administrador en el repositorio.

---

### Paso 3: Busca "Pages" en el Menú Lateral

1. Estás ahora en la página de Settings
2. En el **menú lateral IZQUIERDO**, busca la sección **"Code and automation"**
3. Dentro de esa sección, busca **"Pages"**
4. **Click en "Pages"**

**Estructura del menú lateral:**
```
Settings (menú lateral izquierdo)
├── General
├── Access
│   ├── Collaborators
│   └── Moderation options
├── Code and automation
│   ├── Branches
│   ├── Tags
│   ├── Actions
│   ├── Webhooks
│   ├── Environments
│   ├── 📦 Pages  ← CLICK AQUÍ
│   └── ...
└── ...
```

---

### Paso 4: Configura la Fuente (Source)

1. Estás ahora en la página **"GitHub Pages"**
2. Busca la sección **"Build and deployment"**
3. En **"Source"**, verás un menú desplegable
4. **Click en el menú desplegable**
5. **Selecciona: "GitHub Actions"**

**Cómo debe verse:**

**ANTES (sin configurar):**
```
Build and deployment
├── Source: [None ▼]
└── Branch: (no configurado)
```

**DESPUÉS (configurado correctamente):**
```
Build and deployment
├── Source: [GitHub Actions ▼] ✅
└── (no necesita Branch cuando usas GitHub Actions)
```

**⚠️ NO selecciones "Deploy from a branch"** - Debe ser "GitHub Actions"

---

### Paso 5: Confirma la Configuración

1. Al seleccionar "GitHub Actions", la configuración se guarda automáticamente
2. Verás un mensaje de confirmación en la parte superior
3. La página puede mostrar algo como:

```
✅ Your site is ready to be published
```

**O puede decir:**
```
⏳ Your site is being built...
```

**¡Esto es normal!** Significa que GitHub Pages está habilitado.

---

### Paso 6: Re-ejecuta el Workflow

Ahora que Pages está habilitado, vuelve a ejecutar el deploy:

1. **Ve a la pestaña "Actions"** (en la barra superior del repositorio)
2. Verás una lista de workflows ejecutados
3. **Click en el workflow que falló** (tendrá una ❌ roja)
4. En la página del workflow, busca el botón **"Re-run all jobs"** (arriba a la derecha)
5. **Click en "Re-run all jobs"**

**Ubicación:**
```
Actions → [Lista de workflows] → [Workflow fallido] → [Re-run all jobs ↻]
                                                            👆 CLICK AQUÍ
```

---

### Paso 7: Espera el Deploy

1. El workflow comenzará a ejecutarse nuevamente
2. Verás un círculo amarillo girando (⏳) mientras se ejecuta
3. Espera **2-3 minutos**
4. Cuando termine exitosamente, verás una **marca verde** (✅)

**Estados del workflow:**
```
⏳ En progreso (amarillo)    → Espera...
✅ Exitoso (verde)           → ¡Listo!
❌ Fallido (rojo)            → Ver solución de problemas
```

---

## 🎉 ¡Listo! Tu Sitio Está en Línea

Una vez que el workflow muestre ✅:

1. **Ve a Settings → Pages** nuevamente
2. En la parte superior verás:
   ```
   ✅ Your site is live at https://tu-usuario.github.io/galarragaresearch/
   ```
3. **Click en la URL** para ver tu sitio

---

## 🔄 Deploys Futuros (Automáticos)

**¡Buenas noticias!** Solo necesitas hacer esto **UNA VEZ**.

Para futuros deploys, solo:
```bash
git add .
git commit -m "Mi actualización"
git push origin main
```

El deploy se hará **automáticamente** sin necesidad de re-ejecutar nada.

---

## 📊 Diagrama del Flujo Completo

```
┌─────────────────────────────────────────────────────────┐
│  1. Push a GitHub                                       │
│     git push origin main                                │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  2. Habilitar Pages (SOLO LA PRIMERA VEZ)               │
│     Settings → Pages → Source: "GitHub Actions"         │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  3. Re-ejecutar Workflow (si ya hiciste push)           │
│     Actions → Workflow fallido → Re-run all jobs        │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  4. Esperar 2-3 minutos                                 │
│     Verás ⏳ → ✅                                        │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  5. ¡Sitio en línea!                                    │
│     https://tu-usuario.github.io/galarragaresearch/     │
└─────────────────────────────────────────────────────────┘
```

---

## ❓ Preguntas Frecuentes

### ¿Por qué no veo "Settings"?
**R:** Necesitas ser administrador del repositorio. Contacta al dueño para que te dé permisos.

### ¿Dónde está exactamente "Pages"?
**R:** Settings (⚙️) → Menú lateral izquierdo → Busca "Code and automation" → Pages

### ¿Qué hago si no veo "GitHub Actions" en el menú Source?
**R:** 
1. Verifica que el archivo `.github/workflows/deploy.yml` esté en tu repositorio
2. Recarga la página (F5)
3. Espera 1-2 minutos y vuelve a intentar

### ¿Tengo que hacer esto cada vez que hago un cambio?
**R:** ¡NO! Solo la **primera vez**. Después todos los deploys son automáticos.

---

## 🆘 Si Aún Tienes el Error "Not Found"

Lee la guía completa de solución: **[SOLUCION-ERROR-DEPLOY.md](SOLUCION-ERROR-DEPLOY.md)**

---

## ✅ Checklist Rápido

- [ ] Abrí mi repositorio en GitHub
- [ ] Click en Settings (⚙️)
- [ ] Click en Pages (menú lateral izquierdo)
- [ ] Cambié Source a "GitHub Actions"
- [ ] Vi la confirmación
- [ ] Fui a Actions
- [ ] Click en el workflow fallido
- [ ] Click en "Re-run all jobs"
- [ ] Esperé 2-3 minutos
- [ ] Vi la ✅ verde
- [ ] Mi sitio está en línea

---

## 📱 Versión Mobile

Si estás en móvil:

1. Abre GitHub en el navegador (no en la app)
2. Activa "Vista de escritorio" en tu navegador
3. Sigue los pasos normales

**Nota:** Es más fácil hacer esto desde una computadora.

---

## 🎯 Resumen Ultra-Corto

```
GitHub.com → Tu Repo → ⚙️ Settings → Pages → 
Source: "GitHub Actions" → Actions → Re-run → ✅
```

---

**¡Este es el paso más importante! Una vez hecho, todo lo demás es automático. 🚀**

---

*Última actualización: Octubre 2024*

