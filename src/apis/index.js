// Automatic Import
const { readdirSync } = require('fs');
const files = readdirSync(__dirname)
files.remove('index.js')
let importado = {};
for (let file of files) {
    importado[file.replace(/.js/g, '')] = require(`./${file}`)
}
module.exports = importado