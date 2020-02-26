const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")
const { CanvasTemplates } = require("../../utils/");

module.exports = class WeatherCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'weather',
            alias: ['tempo'],
            category: "utils",
            requirements: {
                botPermissions: [Permissions.attachFiles, Permissions.embedLinks]
            }
        })
    }
    async execute({ guild, reply, author, t }, args) {
        if (!args.join(" ")) return reply(t("commands:weather.missingCity"))
        let result = await this.client.apis.Weather(args.join("+"), t.lng)
        let buffer = await CanvasTemplates.weather(result, t)


        reply({}, {
            file: buffer,
            name: "weather.png"
        })

    }

}