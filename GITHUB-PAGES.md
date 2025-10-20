# 📦 Guía Completa de GitHub Pages

Esta guía te mostrará paso a paso cómo configurar y desplegar tu sitio web en GitHub Pages de forma gratuita.

---

## 📋 Contenido

1. [¿Qué es GitHub Pages?](#qué-es-github-pages)
2. [Requisitos Previos](#requisitos-previos)
3. [Configuración Paso a Paso](#configuración-paso-a-paso)
4. [Verificar el Despliegue](#verificar-el-despliegue)
5. [Dominio Personalizado](#dominio-personalizado)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🌟 ¿Qué es GitHub Pages?

GitHub Pages es un servicio de hosting gratuito que GitHub ofrece para alojar sitios web estáticos directamente desde tu repositorio. Es perfecto para:

- ✅ Sitios web estáticos (HTML, CSS, JavaScript)
- ✅ Landing pages
- ✅ Portafolios
- ✅ Documentación
- ✅ Blogs estáticos

**Ventajas:**
- 🆓 **Totalmente gratis**
- 🔒 **SSL/HTTPS automático**
- 🚀 **Deploy automático con cada push**
- 🌐 **CDN global incluido**
- 📝 **Dominio personalizado gratis**

---

## ✅ Requisitos Previos

Antes de empezar, asegúrate de tener:

1. ✅ Una cuenta de GitHub
2. ✅ Tu código subido a un repositorio de GitHub
3. ✅ El repositorio debe ser público (o tener GitHub Pro para repos privados)

---

## 🚀 Configuración Paso a Paso

### Paso 1: Verificar que tu código está en GitHub

```bash
# Si aún no has subido tu código a GitHub
git add .
git commit -m "Preparar sitio para GitHub Pages"
git push origin main
```

### Paso 2: Habilitar GitHub Pages en tu Repositorio

1. **Ve a tu repositorio en GitHub**
   - Ejemplo: `https://github.com/tu-usuario/galarragaresearch`

2. **Abre la configuración del repositorio**
   - Click en **"Settings"** (⚙️ Configuración)
   - En el menú lateral izquierdo, busca y click en **"Pages"**

3. **Configura la fuente de GitHub Pages**
   - En la sección **"Build and deployment"**
   - En **"Source"**, selecciona: **"GitHub Actions"**
   
   ![GitHub Pages Settings](https://docs.github.com/assets/images/help/pages/select-source.png)

### Paso 3: El Workflow Ya Está Configurado

El archivo `.github/workflows/deploy.yml` ya está incluido en tu proyecto y contiene:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Paso 4: Activar el Deploy Automático

1. **Si ya hiciste push del código**, el workflow se ejecutará automáticamente
2. **Si no**, haz push para activarlo:

```bash
git add .github/workflows/deploy.yml
git commit -m "Actualizar workflow de GitHub Pages"
git push origin main
```

### Paso 5: Esperar el Deploy (2-3 minutos)

El despliegue se hace automáticamente. Puedes ver el progreso en:

1. Ve a la pestaña **"Actions"** en tu repositorio
2. Verás un workflow llamado **"Deploy to GitHub Pages"** ejecutándose
3. Espera a que aparezca una ✅ marca verde (significa que fue exitoso)

---

## ✅ Verificar el Despliegue

### Tu sitio estará disponible en:

```
https://tu-usuario.github.io/galarragaresearch/
```

Por ejemplo, si tu usuario de GitHub es `galarragallc`:
```
https://galarragallc.github.io/galarragaresearch/
```

### Cómo encontrar tu URL:

1. Ve a **Settings → Pages** en tu repositorio
2. En la parte superior verás un mensaje:
   ```
   ✅ Your site is live at https://tu-usuario.github.io/galarragaresearch/
   ```

---

## 🌐 Dominio Personalizado (Opcional)

Si quieres usar tu propio dominio (por ejemplo: `galarragaresearch.com`):

### Paso 1: Configurar en GitHub

1. Ve a **Settings → Pages** en tu repositorio
2. En **"Custom domain"**, ingresa tu dominio: `galarragaresearch.com`
3. Click en **"Save"**

### Paso 2: Configurar DNS con tu Proveedor

Agrega estos registros DNS en tu proveedor de dominios (GoDaddy, Namecheap, etc.):

**Opción A: Dominio raíz (galarragaresearch.com)**

```
Tipo: A
Nombre: @
Valor: 185.199.108.153

Tipo: A
Nombre: @
Valor: 185.199.109.153

Tipo: A
Nombre: @
Valor: 185.199.110.153

Tipo: A
Nombre: @
Valor: 185.199.111.153
```

**Opción B: Subdominio (www.galarragaresearch.com)**

```
Tipo: CNAME
Nombre: www
Valor: tu-usuario.github.io
```

### Paso 3: Habilitar HTTPS

1. Espera 10-15 minutos para que los cambios de DNS se propaguen
2. En **Settings → Pages**, marca la casilla:
   - ✅ **"Enforce HTTPS"**

---

## 🔄 Actualizaciones Automáticas

Cada vez que hagas cambios y los subas a GitHub, tu sitio se actualizará automáticamente:

```bash
# Haz cambios en tu código
# Por ejemplo, edita index.html

# Sube los cambios
git add .
git commit -m "Actualizar contenido de la página"
git push origin main

# ¡Listo! En 2-3 minutos tu sitio estará actualizado
```

---

## 🆘 Solución de Problemas

### ❌ El workflow falla con error de permisos

**Solución:**
1. Ve a **Settings → Actions → General**
2. En **"Workflow permissions"**, selecciona:
   - ✅ **"Read and write permissions"**
3. Guarda los cambios
4. Ve a **Actions** y re-ejecuta el workflow fallido

### ❌ El sitio no carga los estilos o imágenes

**Problema:** Las rutas están mal configuradas para un subdirectorio

**Solución:** Verifica que todas tus rutas sean relativas:

```html
<!-- ✅ CORRECTO -->
<link rel="stylesheet" href="src/styles/main.css">
<script src="src/scripts/main.js"></script>
<img src="src/assets/images/logo.png">

<!-- ❌ INCORRECTO -->
<link rel="stylesheet" href="/src/styles/main.css">
<script src="/src/scripts/main.js"></script>
<img src="/src/assets/images/logo.png">
```

### ❌ El sitio muestra una página 404

**Solución:**
1. Verifica que tienes un archivo `index.html` en la raíz del proyecto
2. Asegúrate de que el workflow se ejecutó exitosamente
3. Ve a **Settings → Pages** y confirma que está habilitado

### ❌ Los cambios no se reflejan en el sitio

**Solución:**
1. **Limpia el caché del navegador:**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Verifica que el workflow se ejecutó:**
   - Ve a la pestaña **"Actions"**
   - Confirma que el último workflow tiene ✅

3. **Espera unos minutos más:**
   - GitHub Pages puede tardar 5-10 minutos en actualizar

---

## 📊 Monitoreo y Analytics

### Agregar Google Analytics (Opcional)

1. Crea una cuenta en [Google Analytics](https://analytics.google.com/)
2. Obtén tu ID de seguimiento (ej: `G-XXXXXXXXXX`)
3. Agrega este código en tu `index.html` antes del `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎯 Comparación con Otras Plataformas

| Característica | GitHub Pages | Netlify | Vercel |
|---------------|--------------|---------|--------|
| **Precio** | 🆓 Gratis | 🆓 Gratis | 🆓 Gratis |
| **SSL/HTTPS** | ✅ Automático | ✅ Automático | ✅ Automático |
| **Deploy Automático** | ✅ Con Actions | ✅ Automático | ✅ Automático |
| **Dominio Personalizado** | ✅ Gratis | ✅ Gratis | ✅ Gratis |
| **Límite de Bandwidth** | 100 GB/mes | 100 GB/mes | 100 GB/mes |
| **CDN Global** | ✅ | ✅ | ✅ |
| **Configuración** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## ✅ Checklist de Configuración Completa

- [ ] Código subido a GitHub en la rama `main`
- [ ] GitHub Pages habilitado en Settings → Pages
- [ ] Source configurado como "GitHub Actions"
- [ ] Workflow `.github/workflows/deploy.yml` presente
- [ ] Workflow ejecutado exitosamente (✅ en Actions)
- [ ] Sitio accesible en `https://tu-usuario.github.io/nombre-repo/`
- [ ] SSL/HTTPS funcionando
- [ ] Estilos y recursos cargando correctamente
- [ ] Sitio responsive en móvil/tablet/desktop
- [ ] (Opcional) Dominio personalizado configurado
- [ ] (Opcional) Google Analytics instalado

---

## 🚀 Comandos Útiles

```bash
# Ver estado de Git
git status

# Subir cambios a GitHub
git add .
git commit -m "Descripción de cambios"
git push origin main

# Ver el log de commits
git log --oneline

# Ver la URL remota
git remote -v

# Forzar rebuild (si es necesario)
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

---

## 📞 Recursos Adicionales

- **Documentación oficial de GitHub Pages:** https://docs.github.com/pages
- **Guía de GitHub Actions:** https://docs.github.com/actions
- **Dominios personalizados:** https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
- **Solución de problemas:** https://docs.github.com/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites

---

## 🎉 ¡Felicidades!

Tu sitio web está ahora desplegado en GitHub Pages y se actualizará automáticamente cada vez que hagas push a la rama `main`.

**URL de tu sitio:**
```
https://tu-usuario.github.io/galarragaresearch/
```

---

## 🔄 Próximos Pasos

1. ✅ Comparte tu URL con el mundo
2. ✅ Configura un dominio personalizado (opcional)
3. ✅ Agrega Google Analytics para ver estadísticas
4. ✅ Optimiza el SEO de tu sitio
5. ✅ Sigue haciendo mejoras (¡deploy automático!)

---

*Última actualización: Octubre 2024*

**¿Necesitas ayuda?** Abre un issue en el repositorio o consulta la [documentación oficial de GitHub Pages](https://docs.github.com/pages).

