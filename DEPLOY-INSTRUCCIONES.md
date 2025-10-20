# 🚀 Instrucciones de Deploy - Galarraga Research

Guía rápida para desplegar tu sitio en diferentes plataformas.

---

## 📋 Tabla de Contenido

1. [GitHub Pages (Recomendado)](#opción-1-github-pages-recomendado-)
2. [Netlify](#opción-2-netlify)
3. [Vercel](#opción-3-vercel)

---

## Opción 1: GitHub Pages (Recomendado) ⭐

### ¿Por qué GitHub Pages?
- ✅ **100% Gratis** - Sin límites de bandwidth
- ✅ **SSL Automático** - HTTPS incluido
- ✅ **Deploy Automático** - Se actualiza con cada push
- ✅ **Sin Configuración** - El workflow ya está listo
- ✅ **CDN Global** - Rápido en todo el mundo

### Pasos de Configuración

#### Paso 1: Sube tu código a GitHub
```bash
git add .
git commit -m "Configurar GitHub Pages"
git push origin main
```

#### Paso 2: Habilita GitHub Pages
1. Ve a tu repositorio en GitHub
2. Click en **Settings** (⚙️)
3. En el menú lateral, busca **Pages**
4. En **Source**, selecciona: **"GitHub Actions"**

#### Paso 3: Espera el Deploy
1. Ve a la pestaña **Actions**
2. Verás el workflow **"Deploy to GitHub Pages"** ejecutándose
3. Espera 2-3 minutos hasta ver ✅

#### Paso 4: ¡Tu sitio está en línea!
Tu URL será:
```
https://tu-usuario.github.io/galarragaresearch/
```

Puedes ver la URL exacta en: **Settings → Pages**

### 📖 Guía Detallada
Para instrucciones completas, ver: **[GITHUB-PAGES.md](GITHUB-PAGES.md)**

---

## Opción 2: Netlify

### Ventajas de Netlify
- ✅ Drag & Drop súper fácil
- ✅ No necesitas Git
- ✅ Deploy instantáneo
- ✅ Preview de branches

### Paso 1: Ve a Netlify
1. Abre: https://app.netlify.com
2. Haz login o crea una cuenta gratuita

### Paso 2: Conecta tu repositorio
1. Click en "Add new site" → "Import an existing project"
2. Selecciona "Deploy with GitHub"
3. Autoriza Netlify para acceder a tu GitHub
4. Busca y selecciona tu repositorio

### Paso 3: Configurar deployment
En la pantalla de configuración:
- **Branch to deploy:** `main`
- **Build command:** (dejar vacío)
- **Publish directory:** `.` (punto)
- **Base directory:** (dejar vacío)

### Paso 4: Deploy
1. Click en "Deploy site"
2. Espera 1-2 minutos
3. ¡Tu sitio estará en línea!

### Tu URL será:
```
https://[nombre-generado].netlify.app
```

Puedes cambiar el nombre en: Site settings → Change site name

---

## Opción 3: Vercel

### Ventajas de Vercel
- ✅ Deploy ultra rápido
- ✅ Excelente para React/Next.js
- ✅ Analytics incluido
- ✅ Deploy automático

### Pasos
1. Ve a: https://vercel.com/new
2. Importa tu repositorio de GitHub
3. Click en "Deploy"
4. ¡Listo!

### Tu URL será:
```
https://galarraga-research.vercel.app
```

---

## 🌐 Configurar Dominio Personalizado (Opcional)

### En GitHub Pages:
1. Settings → Pages → Custom domain
2. Ingresa: `galarragaresearch.com`
3. Configura DNS con tu proveedor:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   ```

### En Netlify:
1. Site settings → Domain management
2. Add custom domain → `galarragaresearch.com`
3. Sigue las instrucciones de DNS

### En Vercel:
1. Project Settings → Domains
2. Add → `galarragaresearch.com`
3. Configura DNS según instrucciones

---

## 🔄 Actualizar tu Sitio

### GitHub Pages (Automático):
```bash
git add .
git commit -m "Actualizar sitio"
git push origin main
# Se actualiza automáticamente en 2-3 minutos
```

### Netlify/Vercel (Automático):
```bash
git add .
git commit -m "Actualizar sitio"
git push origin main
# Se actualiza automáticamente
```

---

## 📊 Comparación de Plataformas

| Característica | GitHub Pages | Netlify | Vercel |
|---------------|--------------|---------|--------|
| **Precio** | 🆓 Gratis | 🆓 Gratis | 🆓 Gratis |
| **SSL/HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto |
| **Deploy Auto** | ✅ | ✅ | ✅ |
| **Bandwidth** | 100GB/mes | 100GB/mes | 100GB/mes |
| **Dominio Custom** | ✅ | ✅ | ✅ |
| **Facilidad** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## ✅ Checklist Post-Deploy

- [ ] Sitio carga correctamente
- [ ] CSS y JS funcionan
- [ ] Imágenes cargan
- [ ] Sitio es responsive
- [ ] HTTPS activo
- [ ] Dominio personalizado (opcional)

---

## 📞 Recursos de Ayuda

### GitHub Pages
- 📖 [Guía Completa](GITHUB-PAGES.md)
- 🚀 [Inicio Rápido](QUICKSTART.md)
- 📚 [Docs Oficiales](https://docs.github.com/pages)

### Netlify
- 📚 [Documentación](https://docs.netlify.com)

### Vercel
- 📚 [Documentación](https://vercel.com/docs)

---

## 🆘 Solución de Problemas

### GitHub Pages no carga
1. Verifica que el workflow terminó exitosamente
2. Confirma que GitHub Pages está habilitado
3. Espera 5-10 minutos adicionales

### Los estilos no cargan
- Verifica que las rutas sean relativas (sin `/` al inicio)
- Limpia el caché del navegador (Ctrl + Shift + R)

### El sitio muestra 404
- Verifica que existe `index.html` en la raíz
- Confirma que el deploy fue exitoso

---

**¡Elige tu plataforma favorita y despliega en minutos! 🎉**

*Para más ayuda, consulta la guía completa en [DEPLOYMENT.md](DEPLOYMENT.md)*

