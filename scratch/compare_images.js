const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getMd5(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

const file1 = path.join(__dirname, '..', 'home prevsaude - Copia.jpg');
const file2 = path.join(__dirname, '..', 'public', 'assets', 'prevsaude-hero-1-clean.jpg');
const file3 = path.join(__dirname, '..', 'foto quem somos 01 - Copia.JPG');
const file4 = path.join(__dirname, '..', 'public', 'assets', 'hero-quem-somos-clean.jpg');

console.log("home prevsaude MD5:", getMd5(file1));
console.log("prevsaude-hero-1-clean MD5:", getMd5(file2));
console.log("foto quem somos MD5:", getMd5(file3));
console.log("hero-quem-somos-clean MD5:", getMd5(file4));
