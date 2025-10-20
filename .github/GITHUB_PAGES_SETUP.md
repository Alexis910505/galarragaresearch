# 🚀 Setup Rápido de GitHub Pages

## ✅ Checklist de Configuración

### 1️⃣ Archivos Necesarios
- ✅ `.github/workflows/deploy.yml` - Workflow de GitHub Actions
- ✅ `index.html` - Página principal
- ✅ `src/` - Carpeta con recursos (CSS, JS, imágenes)

### 2️⃣ Configurar en GitHub

1. **Ve a tu repositorio en GitHub**
   ```
   https://github.com/TU-USUARIO/galarragaresearch
   ```

2. **Abre Settings → Pages**
   - Click en el icono ⚙️ **Settings**
   - En el menú lateral, busca **Pages**

3. **Configura la fuente**
   - **Source:** Selecciona `GitHub Actions`
   - ✅ Guarda los cambios

### 3️⃣ Push de Cambios

```bash
git add .
git commit -m "Configurar GitHub Pages"
git push origin main
```

### 4️⃣ Ver el Progreso

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow **"Deploy to GitHub Pages"** ejecutándose
3. Espera 2-3 minutos hasta que aparezca ✅

### 5️⃣ Verificar el Sitio

Tu sitio estará disponible en:
```
https://TU-USUARIO.github.io/galarragaresearch/
```

Puedes ver la URL exacta en: **Settings → Pages**

---

## 🔧 Comandos Útiles

### Deploy Inicial
```bash
git add .
git commit -m "Deploy inicial a GitHub Pages"
git push origin main
```

### Actualizar Sitio
```bash
git add .
git commit -m "Actualización del sitio"
git push origin main
```

### Ver Estado de Git
```bash
git status
```

### Verificar Remoto
```bash
git remote -v
```

---

## 🆘 Solución de Problemas Comunes

### ❌ Error: "No se puede crear el workflow"
**Solución:** Verifica permisos en Settings → Actions → General
- Marca: ✅ "Read and write permissions"

### ❌ Error: "La página no carga"
**Solución:** Verifica que:
1. El workflow terminó exitosamente (✅ en Actions)
2. GitHub Pages está habilitado en Settings → Pages
3. Espera 5-10 minutos más

### ❌ Error: "Los estilos no cargan"
**Solución:** Las rutas deben ser relativas (sin `/` al inicio)
```html
<!-- ✅ CORRECTO -->
<link rel="stylesheet" href="src/styles/main.css">

<!-- ❌ INCORRECTO -->
<link rel="stylesheet" href="/src/styles/main.css">
```

---

## 📊 Estado del Workflow

### ✅ Exitoso
```
● Deploy to GitHub Pages
  ✓ Checkout
  ✓ Setup Pages
  ✓ Upload artifact
  ✓ Deploy to GitHub Pages
```

### ❌ Fallido
Si el workflow falla:
1. Click en el workflow fallido
2. Lee el mensaje de error
3. Corrige el problema
4. Haz push nuevamente

---

## 🔄 Deploy Automático

Cada vez que hagas `git push origin main`:
1. GitHub Actions detecta el cambio
2. Ejecuta el workflow automáticamente
3. Despliega el sitio actualizado
4. ¡Tu sitio se actualiza en 2-3 minutos!

---

## 🌐 Dominio Personalizado (Opcional)

### Configurar Dominio Propio

1. **En GitHub:**
   - Settings → Pages → Custom domain
   - Ingresa: `tudominio.com`

2. **En tu Proveedor de DNS:**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: CNAME
   Name: www
   Value: TU-USUARIO.github.io
   ```

3. **Habilitar HTTPS:**
   - Espera 10-15 minutos
   - Marca: ✅ "Enforce HTTPS"

---

## 📞 Recursos

- 📖 [Guía Completa](../GITHUB-PAGES.md)
- 🚀 [Inicio Rápido](../QUICKSTART.md)
- 📚 [Docs Oficiales](https://docs.github.com/pages)

---

**¡Tu sitio estará en línea en menos de 5 minutos! 🎉**

