const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Détection du mode de compilation
const args = process.argv.slice(2);
const isBuild =
  args.includes('--mode') && args[args.indexOf('--mode') + 1] === 'build';

// Chemins sources (racine) et destination (public)
const entryPoint = 'assets/ts/main.ts';
const outdir = 'public/js';
const outfile = 'main.js';

// Création du dossier cible s'il n'existe pas
if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir, { recursive: true });
}

// Configuration ESBuild
const buildOptions = {
  entryPoints: [entryPoint],
  bundle: true,
  minify: isBuild,
  sourcemap: !isBuild, // Pratique d'avoir le sourcemap en dev
  target: 'es2020',
  format: 'esm',
  outfile: path.join(outdir, outfile),
};

// Lancement de la compilation
esbuild
  .build(buildOptions)
  .then(() => {
    console.log(
      `✅ TypeScript compiled to ${outdir}/${outfile} (Minified: ${isBuild})`,
    );
  })
  .catch((error) => {
    console.error('❌ TypeScript compilation failed:', error);
    process.exit(1);
  });
