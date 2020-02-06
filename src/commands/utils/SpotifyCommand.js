const CommandHandler = require('../../structures/command/CommandHandler');
const Canvas = require("canvas");
const {MessageAttachment} = require("discord.js")

module.exports = class SpotifyCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'spotify',
            alias: [],
            category: "utils",
            requirements: {}
        })
    }
    async execute({ guild, member, channel, prefix, author, t, CharlotteEmbed, dbBot, getUserAt }, args) {
        
        let user = await getUserAt(0) || author
        let activity = user.presence
        let spotify = activity.activities.filter(a => a.name === "Spotify")

        if (activity && spotify && spotify[0].name.toLowerCase().includes("spotify")) {

            const canvas = Canvas.createCanvas(512 * 3, 512);
            const ctx = canvas.getContext("2d");
            let nome = spotify[0].details
            let by = spotify[0].state
                
            let img = await Canvas.loadImage(spotify[0].assets.largeImageURL());
            let spotifyLogo = await Canvas.loadImage("https://cdn.discordapp.com/emojis/554334875411415107.png");
            ctx.drawImage(img, 0, 0, 512, 512);
            ctx.drawImageBlurred(img, 10, 512, -512 / 2, 512 * 2, 512 * 2);
            ctx.drawImage(spotifyLogo, 550, 38, 100, 100)
            ctx.fillStyle = "white"
            ctx.font = "60px Impact"
            
            ctx.fillText(nome, 550, 200, (512*3)-550)
            ctx.fillText(by, 550, 280, (512*3)-550)
            ctx.fillStyle = "#1DB954"
            //val - ((val / 100) * porcent)
            ctx.roundRect(550, 512 - 35, ((512 * 3) - 600), 20, 10, true, false)//linha preenchida

            ctx.roundRect(550, 512 - 35, (512 * 3) - 600, 20, 10, false, true)
            channel.send(new MessageAttachment(canvas.toBuffer(), "test.png"));

        } else {
            reply("notListening")
        }
            

    }

}