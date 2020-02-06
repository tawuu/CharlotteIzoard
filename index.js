const CharlotteClient = require('./src/CharlotteClient');
const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Ela ta em uma host gratuita, então sim, eu preciso disso
app.listen(process.env.PORT ? process.env.PORT : 3000)
setInterval(() => {
    require("http").get(`http://${process.env.PROJECT_DOMAIN ? process.env.PROJECT_DOMAIN : "test"}.glitch.me/`)
}, 30000)
app.get("/", (req, res) => {
    res.status(200).send("OK")
})



const CHARLOTTE_OPTIONS = {
    disableEveryone: true,
    fetchAllMembers: true
};



// Inicializing Canvas Utils
require("./src/utils/CanvasUtils").start()


const client = new CharlotteClient(CHARLOTTE_OPTIONS);

client.login(process.env.token); // Inicializando a Charlotte ♥