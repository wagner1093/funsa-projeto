const fs = require('fs');
const pdf = require('pdf-parse');

async function parsePdfs() {
    try {
        const paletaPath = '../Identidade Visual/PALETA DE CORES.pdf';
        const paletaBuffer = fs.readFileSync(paletaPath);
        const paletaData = await pdf(paletaBuffer);
        console.log('--- PALETA DE CORES ---');
        console.log(paletaData.text);
        
        const tipografiaPath = '../Identidade Visual/TIPOGRAFIA.pdf';
        const tipografiaBuffer = fs.readFileSync(tipografiaPath);
        const tipografiaData = await pdf(tipografiaBuffer);
        console.log('\n--- TIPOGRAFIA ---');
        console.log(tipografiaData.text);
    } catch (err) {
        console.error(err);
    }
}

parsePdfs();
