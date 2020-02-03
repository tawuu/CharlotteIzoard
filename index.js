const CharlotteClient = require('./src/CharlotteClient');
const dotenv = require('dotenv');
dotenv.config();

const CHARLOTTE_OPTIONS = {
    disableEveryone: true,
};



// Inicializing Canvas Utils



const client = new CharlotteClient(CHARLOTTE_OPTIONS);

client.login(process.env.token); // Inicializando a Charlotte ♥