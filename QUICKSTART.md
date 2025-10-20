# 🚀 Inicio Rápido - Deploy en 5 Minutos

## Opción 1: GitHub Pages (100% Gratis) 📦 ⭐

**Ventajas:** Totalmente gratis, SSL automático, deploy automático, sin límites

### Pasos Rápidos:

1. **Sube tu código a GitHub** (si no lo has hecho)
   ```bash
   git add .
   git commit -m "Deploy inicial"
   git push origin main
   ```

2. **Habilita GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Click en **Settings** → **Pages**
   - En **Source**, selecciona: **"GitHub Actions"**

3. **El workflow se ejecuta automáticamente**
   - Ve a la pestaña **Actions**
   - Espera 2-3 minutos (verás una ✅ verde cuando termine)

4. **¡Tu sitio está en línea!**
   - URL: `https://tu-usuario.github.io/galarragaresearch/`
   - Puedes verla en Settings → Pages

**Ver guía completa:** [GITHUB-PAGES.md](GITHUB-PAGES.md)

---

## Opción 2: Netlify (Drag & Drop) ⭐

**Ventajas:** Super fácil, no necesitas Git

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

## Opción 3: Vercel (Alternativa) ⚡

1. Ve a: https://vercel.com/new
2. Importa tu repositorio de GitHub
3. Click en "Deploy"
4. ¡Listo!

**Tu URL será:** `https://galarraga-research.vercel.app`

---

## 🌐 Configurar Dominio Personalizado

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
3. Configura DNS según instrucciones

### En Vercel:
1. Project Settings → Domains
2. Add → `galarragaresearch.com`
3. Configura DNS según instrucciones

### DNS Configuración:
```
Type: CNAME
Name: www
Value: [tu-sitio].netlify.app o [tu-sitio].vercel.app o tu-usuario.github.io
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

- **GitHub Pages Guía Completa:** [GITHUB-PAGES.md](GITHUB-PAGES.md) ⭐
- **GitHub Pages Docs:** https://docs.github.com/pages
- **Netlify Docs:** https://docs.netlify.com/
- **Vercel Docs:** https://vercel.com/docs

---

## 🔄 Actualizar tu Sitio

### GitHub Pages (Automático):
```bash
git add .
git commit -m "Actualizar sitio"
git push origin main
# ¡Se actualiza automáticamente en 2-3 minutos!
```

### Netlify/Vercel (Automático con Git):
- Solo haz push a GitHub, se actualiza automáticamente

### Netlify (Manual Drag & Drop):
- Arrastra la carpeta nuevamente en el mismo sitio

---

**¡Tu sitio estará en línea en menos de 5 minutos! 🎉**

