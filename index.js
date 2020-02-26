const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
// Ela ta em uma host gratuita, então sim, eu preciso disso
app.listen(process.env.PORT ? process.env.PORT : 3000)
setInterval(() => {
    require("http").get(`http://${process.env.PROJECT_DOMAIN ? process.env.PROJECT_DOMAIN : "test"}.glitch.me/`)
}, 30000)
app.get("/", (req, res) => {
    res.status(200).send("OK")
})


require("./src/utils/Proptypes").start();
require("./src/utils/Canvas/CanvasUtils").start();


const CharlotteClient = require('./src/CharlotteClient');
const CHARLOTTE_OPTIONS = {
    autoreconnect: true,
    disableEveryone: true,
    getAllUsers: true,
    requestTimeout: 30000,
    restMode: true
}


const client = new CharlotteClient(process.env.token, CHARLOTTE_OPTIONS);

client.connect(); // Inicializando a Charlotte ♥