const CommandHandler = require('../../structures/command/CommandHandler');
const { Permissions: { FLAGS } } = require("discord.js");
const { CanvasTemplates } = require("../../utils/");

module.exports = class WeatherCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'weather',
            alias: ['tempo'],
            category: "utils",
            requirements: {
                botPermissions: [FLAGS.ATTACH_FILES, FLAGS.EMBED_LINKS]
            }
        })
    }
    async execute({ guild, reply, channel, author, t, CharlotteEmbed }, args) {
        if (!args.join(" ")) return reply(t("commands:weather.missingCity"))
        let result = await this.client.apis.Weather(args.join("+"), t.lng)
        let buffer = await CanvasTemplates.weather(result, t)

        let WeatherEmbed = new CharlotteEmbed({
            image: {
                url: `attachment://weather.png`
            },
            files: [{
                attachment: buffer, 
                name: `weather.png`
            }]
        })
        .setAuthor(author.tag, author.displayAvatarURL())

            channel.send(WeatherEmbed)

    }

}