const CommandHandler = require('../../structures/command/CommandHandler');
const Canvas = require("canvas");
const {MessageAttachment} = require("discord.js")
const moment = require("moment")
const {Permissions: {FLAGS}} = require("discord.js")

module.exports = class SpotifyCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'spotify',
            alias: [],
            category: "utils",
            requirements: {
                botPermissions: [FLAGS.ATTACH_FILES]
            }
        })
    }
    async execute({ guild, member, reply, channel, prefix, author, t, CharlotteEmbed, dbBot, getUserAt }, args) {
        
        let user = await getUserAt(0) || author
        let activity = user.presence
        let spotify = activity.activities.filter(a => a.name === "Spotify")

        if (activity && spotify.length >= 1 && spotify[0].name.toLowerCase().includes("spotify")) {
            
            const canvas = Canvas.createCanvas(512 * 3, 512);
            const ctx = canvas.getContext("2d");
            let nome = spotify[0].details
            let by = spotify[0].state
            
            let img = await Canvas.loadImage(spotify[0].assets.largeImageURL());
            let spotifyLogo = await Canvas.loadImage("https://cdn.discordapp.com/emojis/554334875411415107.png");
            ctx.drawImageBlurred(img, 10, 512, -512 / 2, 512 * 2, 512 * 2);
            ctx.fillStyle = "white"
            
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = -200
            ctx.shadowColor = "black"
            ctx.shadowBlur = 300
            ctx.fillRect(0, 512, canvas.width + 200, 5000)
            

            


            ctx.drawImage(img, 0, 0, 512, 512);
            ctx.drawImage(spotifyLogo, 550, 38, 100, 100)
            let start = spotify[0].timestamps.start
            let end = spotify[0].timestamps.end
            let valor = (new Date() - start) / (end - start)
            
            ctx.font = "60px Arial Black"
            ctx.fillText(nome, 550, 340, (512 * 3) - 550)
            ctx.font = "50px Arial Black"
        
            ctx.fillText(by, 550, 400, (512 * 3) - 550)
            ctx.font = "40px Arial Black"
            ctx.fillText(moment.utc(new Date - start).format("mm:ss"), 550, 512 - 50)
            ctx.fillText(moment.utc(end - start).format("mm:ss"), canvas.width - 175, 512 - 50)
            
            //barra
            ctx.fillStyle = "#737373"
            ctx.roundRect(550, 512 - 35, (512 * 3) - 600, 20, 10, true, false)
            

            ctx.fillStyle = "#1DB954"             
            ctx.roundRect(550, 512 - 35, valor * ((512 * 3) - 600), 20, 10, true, false)//linha preenchida


            channel.send(new MessageAttachment(canvas.toBuffer(), "spotify.png"));

        } else {
            reply(t("commands:spotify.notListening"))
        }
            

    }

}