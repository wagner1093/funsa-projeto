const fs = require('fs');
const PDFParser = require('pdf2json');

function parsePDF(filePath) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            resolve(pdfParser.getRawTextContent());
        });
        pdfParser.loadPDF(filePath);
    });
}

async function main() {
    try {
        const paletaText = await parsePDF('../Identidade Visual/PALETA DE CORES.pdf');
        console.log('--- PALETA DE CORES ---');
        console.log(paletaText);
        
        const tipografiaText = await parsePDF('../Identidade Visual/TIPOGRAFIA.pdf');
        console.log('\n--- TIPOGRAFIA ---');
        console.log(tipografiaText);
    } catch(e) {
        console.error(e);
    }
}
main();
