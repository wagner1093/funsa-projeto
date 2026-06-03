const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = __dirname;
const assetsDir = path.join(rootDir, '..', 'public', 'assets');

const slides = [
  { input: 'home prevsaude.jpg', output: 'prevsaude-hero-1.webp' },
  { input: 'slide 2 prevsaude.jpg', output: 'prevsaude-hero-2.webp' },
  { input: 'slide 3 prevsaude.jpg', output: 'prevsaude-hero-3.webp' },
];

async function compressPrevsaude() {
  try {
    for (const slide of slides) {
      const inputPath = path.join(rootDir, '..', slide.input);
      const outputPath = path.join(assetsDir, slide.output);

      if (fs.existsSync(inputPath)) {
        console.log(`Convertendo e comprimindo: ${slide.input} -> ${slide.output}...`);
        
        // Resize hero images to max 1920 width, high quality 85% WebP
        await sharp(inputPath)
          .resize(1920, null, { withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(outputPath);
          
        console.log(`Concluído: ${slide.output}`);
      } else {
        console.warn(`Arquivo não encontrado: ${inputPath}`);
      }
    }
    console.log('Imagens de PrevSaúde comprimidas e salvas!');
  } catch (error) {
    console.error('Erro na compressão:', error);
  }
}

compressPrevsaude();
