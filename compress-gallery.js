const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const galleryDir = path.join(__dirname, 'public', 'assets', 'galeria');

async function compressImages() {
  try {
    const files = fs.readdirSync(galleryDir);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const filePath = path.join(galleryDir, file);
        const newFileName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const webpPath = path.join(galleryDir, newFileName);
        
        console.log(`Convertendo e comprimindo: ${file} para ${newFileName}...`);
        
        // Redimensionar para max largura 1200px e converter para WebP
        await sharp(filePath)
          .resize(1200, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(webpPath);
          
        console.log(`Concluído: ${newFileName}`);
      }
    }
    console.log('Todas as imagens foram convertidas para WebP!');
  } catch (error) {
    console.error('Erro na compressão:', error);
  }
}

compressImages();
