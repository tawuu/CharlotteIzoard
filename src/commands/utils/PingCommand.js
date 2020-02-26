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
    async execute ({guild, member, voice, reply, prefix, author, t}, args) {
        reply(t('commands:ping.response', {
            ping: Math.floor(guild.shard.latency),
            author: author.mention
        }))
    }
}