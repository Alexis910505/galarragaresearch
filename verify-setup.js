#!/usr/bin/env node

/**
 * Script de Verificación de Configuración para GitHub Pages
 * Verifica que todos los archivos necesarios estén presentes
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Verificando configuración de GitHub Pages...\n');

const checks = [
  {
    name: 'Archivo index.html',
    path: 'index.html',
    type: 'file',
    required: true
  },
  {
    name: 'Workflow de GitHub Actions',
    path: '.github/workflows/deploy.yml',
    type: 'file',
    required: true
  },
  {
    name: 'Directorio src/scripts',
    path: 'src/scripts',
    type: 'directory',
    required: true
  },
  {
    name: 'Directorio src/styles',
    path: 'src/styles',
    type: 'directory',
    required: true
  },
  {
    name: 'Archivo package.json',
    path: 'package.json',
    type: 'file',
    required: true
  },
  {
    name: 'Guía de GitHub Pages',
    path: 'GITHUB-PAGES.md',
    type: 'file',
    required: false
  },
  {
    name: 'Guía de inicio rápido',
    path: 'QUICKSTART.md',
    type: 'file',
    required: false
  }
];

let allPassed = true;
let requiredPassed = true;

checks.forEach(check => {
  const exists = fs.existsSync(check.path);
  const isCorrectType = exists && (
    (check.type === 'file' && fs.statSync(check.path).isFile()) ||
    (check.type === 'directory' && fs.statSync(check.path).isDirectory())
  );
  
  const status = isCorrectType ? '✅' : (check.required ? '❌' : '⚠️');
  const message = isCorrectType ? 'OK' : (check.required ? 'FALTA (Requerido)' : 'No encontrado (Opcional)');
  
  console.log(`${status} ${check.name}: ${message}`);
  
  if (!isCorrectType) {
    allPassed = false;
    if (check.required) {
      requiredPassed = false;
    }
  }
});

console.log('\n' + '='.repeat(60));

if (requiredPassed) {
  console.log('\n✅ ¡Configuración lista para GitHub Pages!\n');
  console.log('📋 Próximos pasos:');
  console.log('   1. git add .');
  console.log('   2. git commit -m "Configurar GitHub Pages"');
  console.log('   3. git push origin main');
  console.log('   4. Ve a Settings → Pages en tu repositorio');
  console.log('   5. Selecciona Source: "GitHub Actions"');
  console.log('\n📖 Ver guía completa: GITHUB-PAGES.md\n');
} else {
  console.log('\n❌ Faltan archivos requeridos\n');
  console.log('Por favor, verifica que todos los archivos necesarios estén presentes.\n');
}

// Verificar rutas en index.html
console.log('\n🔍 Verificando rutas en index.html...\n');

try {
  const indexContent = fs.readFileSync('index.html', 'utf8');
  
  const hasAbsolutePaths = /href="\/[^/]|src="\/[^/]/.test(indexContent);
  
  if (hasAbsolutePaths) {
    console.log('⚠️  ADVERTENCIA: Se detectaron rutas absolutas en index.html');
    console.log('   Las rutas absolutas (que empiezan con /) pueden causar problemas');
    console.log('   en GitHub Pages. Considera usar rutas relativas.\n');
    console.log('   ❌ Incorrecto: href="/src/styles/main.css"');
    console.log('   ✅ Correcto:   href="src/styles/main.css"\n');
  } else {
    console.log('✅ Las rutas en index.html parecen correctas\n');
  }
} catch (error) {
  console.log('⚠️  No se pudo verificar las rutas en index.html\n');
}

// Verificar configuración de Git
console.log('\n🔍 Verificando configuración de Git...\n');

try {
  const { execSync } = require('child_process');
  
  try {
    const remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    console.log(`✅ Repositorio remoto: ${remote}`);
  } catch (e) {
    console.log('⚠️  No se encontró un repositorio remoto de Git');
    console.log('   Ejecuta: git remote add origin <URL-del-repositorio>\n');
  }
  
  try {
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    console.log(`✅ Rama actual: ${branch}`);
    
    if (branch !== 'main' && branch !== 'master') {
      console.log('⚠️  ADVERTENCIA: La rama actual no es "main"');
      console.log('   El workflow está configurado para la rama "main"\n');
    }
  } catch (e) {
    console.log('⚠️  No se pudo determinar la rama actual\n');
  }
  
} catch (error) {
  console.log('⚠️  Git no está disponible o no es un repositorio Git\n');
}

console.log('\n' + '='.repeat(60));
console.log('\n📖 Documentación disponible:');
console.log('   - GITHUB-PAGES.md: Guía completa de GitHub Pages');
console.log('   - QUICKSTART.md: Inicio rápido (5 minutos)');
console.log('   - DEPLOY-INSTRUCCIONES.md: Instrucciones de deploy');
console.log('   - DEPLOYMENT.md: Guía detallada de deployment\n');

process.exit(requiredPassed ? 0 : 1);

