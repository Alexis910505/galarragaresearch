# 🚀 Guía de Despliegue - Galarraga Research

Esta guía te ayudará a desplegar tu sitio web en diferentes plataformas de hosting.

---

## 📋 Contenido

1. [Netlify (Recomendado)](#netlify)
2. [Vercel](#vercel)
3. [GitHub Pages](#github-pages)
4. [Hosting Tradicional](#hosting-tradicional)

---

## 🎯 Netlify (Recomendado)

### Opción 1: Deploy desde Git (Automatizado)

1. **Crea una cuenta en Netlify**
   - Visita: https://www.netlify.com/
   - Regístrate gratis con GitHub, GitLab o email

2. **Conecta tu repositorio**
   - Click en "Add new site" → "Import an existing project"
   - Selecciona GitHub/GitLab
   - Autoriza Netlify y selecciona tu repositorio

3. **Configura el deploy**
   - Build command: `echo 'Sitio estático'` (opcional)
   - Publish directory: `.` (raíz del proyecto)
   - Click en "Deploy site"

4. **¡Listo!** 🎉
   - Tu sitio estará en línea en minutos
   - URL temporal: `random-name.netlify.app`
   - Puedes cambiar el nombre en: Site settings → Domain management

### Opción 2: Deploy Manual (Drag & Drop)

1. **Preparar archivos**
   ```bash
   # No necesitas hacer nada, solo tener los archivos listos
   ```

2. **Deploy en Netlify**
   - Ve a: https://app.netlify.com/drop
   - Arrastra la carpeta completa del proyecto
   - ¡Listo! Tu sitio estará en línea

### Configuración del Dominio Personalizado

1. En Netlify Dashboard → Site settings → Domain management
2. Click en "Add custom domain"
3. Ingresa tu dominio: `galarragaresearch.com`
4. Sigue las instrucciones para configurar DNS

### SSL Gratis

- Netlify incluye certificado SSL gratis automáticamente
- Tu sitio será `https://tudominio.com`

---

## ⚡ Vercel

### Deploy desde Git

1. **Crea una cuenta en Vercel**
   - Visita: https://vercel.com/
   - Regístrate gratis con GitHub/GitLab

2. **Importa tu proyecto**
   - Click en "Add New Project"
   - Selecciona tu repositorio
   - Click en "Import"

3. **Configura el deploy**
   - Framework Preset: "Other"
   - Build Command: (dejar vacío)
   - Output Directory: `.`
   - Click en "Deploy"

4. **¡Listo!** 🎉
   - Tu sitio estará en: `galarraga-research.vercel.app`
   - Cada push a main desplegará automáticamente

### Configurar Dominio Personalizado

1. En tu proyecto → Settings → Domains
2. Agrega tu dominio personalizado
3. Sigue las instrucciones de DNS

---

## 📦 GitHub Pages

### Configuración Automática (GitHub Actions)

1. **Habilitar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: "GitHub Actions"

2. **Push el workflow**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Verifica el deploy**
   - Ve a: Actions tab en tu repositorio
   - Espera a que termine el workflow (2-3 minutos)

4. **Tu sitio estará en:**
   - `https://tu-usuario.github.io/galarragaresearch/`

### Configurar Dominio Personalizado

1. Settings → Pages → Custom domain
2. Ingresa: `galarragaresearch.com`
3. Configura DNS con tu proveedor:
   ```
   Type: CNAME
   Name: www
   Value: tu-usuario.github.io
   ```

---

## 🖥️ Hosting Tradicional (cPanel, FTP)

### Pasos para deployment

1. **Preparar archivos**
   - Todos los archivos del proyecto están listos
   - No necesitas compilar nada

2. **Subir por FTP**
   ```
   Host: ftp.tudominio.com
   Usuario: tu-usuario
   Contraseña: tu-contraseña
   Puerto: 21
   ```

3. **Estructura de carpetas**
   ```
   public_html/
   ├── index.html
   ├── src/
   │   ├── scripts/
   │   ├── styles/
   │   └── assets/
   └── export/
   ```

4. **Verificar permisos**
   - Archivos: 644
   - Carpetas: 755

---

## 🔒 Configuración de Seguridad

### Archivo .htaccess (Apache)

Crea un archivo `.htaccess` en la raíz:

```apache
# Habilitar compresión
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Seguridad
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Forzar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 📊 Monitoreo y Analytics

### Google Analytics

1. Crea una cuenta en: https://analytics.google.com/
2. Obtén tu ID de seguimiento: `G-XXXXXXXXXX`
3. Agrega antes del `</head>` en `index.html`:

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

## 🎯 Comparación de Plataformas

| Característica | Netlify | Vercel | GitHub Pages | Hosting Tradicional |
|---------------|---------|--------|--------------|-------------------|
| **Precio** | Gratis | Gratis | Gratis | $5-50/mes |
| **SSL** | ✅ Gratis | ✅ Gratis | ✅ Gratis | 💰 Extra |
| **Deploy Automático** | ✅ | ✅ | ✅ | ❌ Manual |
| **Dominio Personalizado** | ✅ | ✅ | ✅ | ✅ |
| **CDN Global** | ✅ | ✅ | ✅ | Depende |
| **Fácil de usar** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🆘 Solución de Problemas

### El sitio no carga los estilos

**Problema:** Las rutas de los archivos CSS/JS no funcionan

**Solución:**
- Verifica que las rutas sean relativas: `src/styles/main.css`
- No uses `/src/styles/main.css` (ruta absoluta)

### Error 404 en rutas

**Problema:** Páginas no encontradas

**Solución en Netlify:**
- El archivo `netlify.toml` ya tiene la configuración de redirects

**Solución en Vercel:**
- El archivo `vercel.json` ya tiene la configuración de rewrites

### El sitio carga lento

**Soluciones:**
1. Optimiza imágenes (usa WebP, compress imágenes)
2. Minifica CSS y JS
3. Habilita caché (ya configurado en archivos)

---

## ✅ Checklist Post-Deploy

- [ ] El sitio carga correctamente
- [ ] Todas las páginas funcionan
- [ ] Los estilos se aplican correctamente
- [ ] Las imágenes cargan
- [ ] El sitio es responsive (móvil/tablet/desktop)
- [ ] SSL está activo (https://)
- [ ] Dominio personalizado configurado
- [ ] Google Analytics instalado
- [ ] Prueba en diferentes navegadores
- [ ] Prueba en diferentes dispositivos

---

## 📞 Soporte

Si tienes problemas con el deploy:

1. **Netlify:** https://docs.netlify.com/
2. **Vercel:** https://vercel.com/docs
3. **GitHub Pages:** https://docs.github.com/pages

---

## 🎉 ¡Felicidades!

Tu sitio web está ahora en línea y accesible para todo el mundo.

**URLs de ejemplo:**
- Netlify: `https://galarraga-research.netlify.app`
- Vercel: `https://galarraga-research.vercel.app`
- GitHub: `https://tu-usuario.github.io/galarragaresearch/`

---

*Última actualización: Octubre 2024*

