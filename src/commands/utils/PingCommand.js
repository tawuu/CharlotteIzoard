const CommandHandler = require('../../structures/command/CommandHandler');

module.exports = class PingCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'ping',
            alias: [],
            category: "utils",
            requirements: {}
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t}, args) {
        channel.send(t('commands:ping.response', {
            ping: Math.floor(this.client.ws.ping),
            author: author.toString()
        }))
    }
}