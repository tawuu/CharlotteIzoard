const CommandHandler = require('../../structures/command/CommandHandler');
const util = require('util')

module.exports = class TestCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'test',
            alias: ["teste", "testar"],
            category: "devs",
            requirements: {
                onlyDevs: true,
            }
        })
    }
    async execute({ guild, member, voice, channel, prefix, author, t, user, dbBot, dbGuild, CharlotteEmbed, me, reply }, args) {
        


    }
}