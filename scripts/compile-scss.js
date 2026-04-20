const sass = require('sass');
const fs = require('fs');
const path = require('path');

// Détection du mode de compilation
const args = process.argv.slice(2);
const isBuild =
  args.includes('--mode') && args[args.indexOf('--mode') + 1] === 'build';

// Chemins sources (racine) et destination (public)
const entryPoint = 'assets/scss/main.scss';
const outdir = 'public/css';
const outfile = 'main.css';

// Création du dossier cible s'il n'existe pas
if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir, { recursive: true });
}

try {
  // Compilation avec style dynamique
  const result = sass.compile(entryPoint, {
    style: isBuild ? 'compressed' : 'expanded',
  });

  // Écriture du fichier
  fs.writeFileSync(path.join(outdir, outfile), result.css);
  console.log(
    `✅ SCSS compiled to ${outdir}/${outfile} (Minified: ${isBuild})`,
  );
} catch (error) {
  console.error('❌ SCSS compilation failed:', error.message);
  process.exit(1);
}
