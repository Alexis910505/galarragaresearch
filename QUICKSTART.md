# 🚀 Inicio Rápido - Deploy en 5 Minutos

## Opción 1: Netlify (Más Fácil) ⭐

### Método Drag & Drop (Sin Git)

1. Visita: https://app.netlify.com/drop
2. Arrastra toda la carpeta del proyecto
3. ¡Listo! Tu sitio estará en línea

**Tu URL será:** `https://random-name.netlify.app`

### Método desde GitHub (Automatizado)

1. Ve a: https://app.netlify.com
2. Click en "Add new site" → "Import an existing project"
3. Selecciona tu repositorio de GitHub
4. Click en "Deploy site"
5. ¡Listo!

---

## Opción 2: Vercel (Alternativa) ⚡

1. Ve a: https://vercel.com/new
2. Importa tu repositorio de GitHub
3. Click en "Deploy"
4. ¡Listo!

**Tu URL será:** `https://galarraga-research.vercel.app`

---

## Opción 3: GitHub Pages (Gratis) 📦

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: "GitHub Actions"
4. Push los archivos (incluyendo `.github/workflows/deploy.yml`)
5. ¡Listo!

**Tu URL será:** `https://tu-usuario.github.io/galarragaresearch/`

---

## 🌐 Configurar Dominio Personalizado

### En Netlify:
1. Site settings → Domain management
2. Add custom domain → `galarragaresearch.com`
3. Configura DNS según instrucciones

### En Vercel:
1. Project Settings → Domains
2. Add → `galarragaresearch.com`
3. Configura DNS según instrucciones

### DNS Configuración:
```
Type: CNAME
Name: www
Value: [tu-sitio].netlify.app o [tu-sitio].vercel.app
```

---

## ✅ Verificación Post-Deploy

- [ ] El sitio carga: ✅
- [ ] CSS funciona: ✅
- [ ] JavaScript funciona: ✅
- [ ] Es responsive: ✅
- [ ] HTTPS activo: ✅

---

## 📞 URLs de Apoyo

- **Netlify Docs:** https://docs.netlify.com/
- **Vercel Docs:** https://vercel.com/docs
- **GitHub Pages:** https://pages.github.com/

---

**¡Tu sitio estará en línea en menos de 5 minutos! 🎉**

