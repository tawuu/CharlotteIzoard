const CommandHandler = require('../../structures/command/CommandHandler');
const WeatherApi = require("../../utils/WeatherApi/Weather")
const templates = require("../../utils/Canvas/Templates")
module.exports = class WeatherCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'weather',
            alias: ['tempo'],
            category: "utils",
            requirements: {}
        })
    }
    async execute({ guild, reply, channel, author, t, CharlotteEmbed }, args) {
        if (!args.join(" ")) return reply(t("commands:weather.missingCity"))
        let result = await WeatherApi.getWeather(args.join("+"), t.lng)
        let buffer = await templates.weather(result, t)

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