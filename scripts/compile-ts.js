const sass = require('sass');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isBuild = args.includes('--mode') && args[args.indexOf('--mode') + 1] === 'build';
const isWatch = args.includes('--mode') && args[args.indexOf('--mode') + 1] === 'dev';

const entryPoint = 'assets/scss/custom.scss';
const outdir = 'public/css';
const outfile = 'custom.css';

// Fonction de compilation isolée
function compileSass() {
  try {
    // 1. Sécurité : on s'assure que le dossier existe À CHAQUE compilation
    if (!fs.existsSync(outdir)) {
      fs.mkdirSync(outdir, { recursive: true });
    }

    // 2. Compilation
    const result = sass.compile(entryPoint, { 
      style: isBuild ? 'compressed' : 'expanded' 
    });

    // 3. Écriture
    fs.writeFileSync(path.join(outdir, outfile), result.css);
    
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ✅ SCSS compiled to ${outdir}/${outfile}`);
    
  } catch (error) {
    // 4. On avertit sans crasher le watcher (pratique pour les erreurs de syntaxe SCSS)
    const time = new Date().toLocaleTimeString();
    console.warn(`[${time}] ⚠️ SCSS compilation issue: ${error.message}`);
  }
}

// Premier lancement
compileSass();

// Mode Watch
if (isWatch) {
  console.log('👀 Watching SCSS files for changes...');
  let timeout;
  
  fs.watch('assets/scss', { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.scss')) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        compileSass();
      }, 100);
    }
  });
}