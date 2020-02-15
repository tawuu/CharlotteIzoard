const {createCanvas, loadImage} = require("canvas")
module.exports = class Templates {
    static async weather(weather, t) {
        const canvas = createCanvas(1920, 1080)
        const ctx = canvas.getContext("2d")
        let code = weather.subinfo.imageCode

        
        let relativeImage = await loadImage(`./src/assets/weather/skyImages/${code}.png`)
        let sky = await loadImage("./src/assets/weather/sky.png");
        ctx.drawImage(sky, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = "bold 100px sans-serif";
        ctx.fillText("°"+weather.degreeType, 620, 350);
        ctx.drawImage(relativeImage, 1500, 350, 250, 250);
        ctx.textAlign = "right";
        ctx.font = "bold 300px sans-serif";
        ctx.fillText(weather.temperatura, 600, 500);
        ctx.textAlign = "left";
        ctx.font = "bold 70px sans-serif";
        ctx.fillText(weather.subinfo.desc, 850, 330);

        //Informações do tempo
        ctx.font = "bold 60px sans-serif";
        ctx.fillText(`${t("commands:weather.min")}: ${weather.subinfo.min}`, 850, 450)
        ctx.fillText(`${t("commands:weather.max")}: ${weather.subinfo.max}`, 850, 540)
        
        
        ctx.fillText(`${t("commands:weather.sensacaotermica")}: ${weather.subinfo.sensacaotermica}°`, 150, 700)
        ctx.fillText(`${t("commands:weather.precipitação")}: ${weather.precepitacao}`, 150, 790)
        ctx.fillText(`${t("commands:weather.barometro")}: ${weather.subinfo.barometro}`, 150, 880)
        ctx.fillText(`${t("commands:weather.vento")}: ${weather.subinfo.vento}`, 150, 970)

        ctx.fillText(`${t("commands:weather.pontodeorvalho")}: ${weather.subinfo.pontodeorvalho}`, 1150, 700)
        ctx.fillText(`${t("commands:weather.visibilidade")}: ${weather.subinfo.visibilidade}`, 1150, 790)
        ctx.fillText(`${t("commands:weather.umidade")}: ${weather.subinfo.umidade}`, 1150, 880)


        ctx.font = "bold 100px sans-serif"
        ctx.textAlign = "center";
        ctx.fillStyle = 'white'
        ctx.roundRect(300, 10, canvas.width - 300 * 2, 165, 50, true)
        ctx.fillStyle = 'black'
        ctx.fillText(weather.local, canvas.width / 2, 130)

        const buffer = canvas.toBuffer()
        return buffer;
    }
}