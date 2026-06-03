const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '..', 'public', 'assets');

const images = [
  { input: 'hero-home-clean.jpg', output: 'hero-home-clean.webp' },
  { input: 'home-prevsaude-copia.jpg', output: 'home-prevsaude-copia.webp' },
  { input: 'foto-quem-somos-copia.jpg', output: 'foto-quem-somos-copia.webp' }
];

async function run() {
  for (const img of images) {
    const inputPath = path.join(assetsDir, img.input);
    const outputPath = path.join(assetsDir, img.output);

    if (fs.existsSync(inputPath)) {
      console.log(`Comprimindo ${img.input} (${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(2)} MB)...`);
      await sharp(inputPath)
        .resize(1920, null, { withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(outputPath);
      console.log(`Gerado: ${img.output} (${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB)`);
    } else {
      console.log(`Arquivo não encontrado: ${img.input}`);
    }
  }
}

run().catch(console.error);
