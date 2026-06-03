const fs = require('fs');
const path = require('path');

const img1 = path.join(__dirname, '..', 'home prevsaude - Copia.jpg');
const img2 = path.join(__dirname, '..', 'foto quem somos 01 - Copia.JPG');

console.log("img1 exists:", fs.existsSync(img1), "size:", fs.statSync(img1).size);
console.log("img2 exists:", fs.existsSync(img2), "size:", fs.statSync(img2).size);
