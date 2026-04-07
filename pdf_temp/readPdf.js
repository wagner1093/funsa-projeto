const fs = require('fs');
const pdf = require('pdf-parse');

const filepath = 'c:\\Users\\Wagner\\OneDrive\\Desktop\\Funsa\\AJUSTES NOVO SITE FUNSA_26.03 (4).pdf';
let dataBuffer = fs.readFileSync(filepath);

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(err) {
    console.error(err);
});
