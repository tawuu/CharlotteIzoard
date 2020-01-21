const CharlotteClient = require('./src/CharlotteClient');
const dotenv = require('dotenv')
dotenv.config();

const CHARLOTTE_OPTIONS = {
    disableEveryone: true,
};

const client = new CharlotteClient();

client.login(process.env.token); // Inicializando a Charlotte ♥