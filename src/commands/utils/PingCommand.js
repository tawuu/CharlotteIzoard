const CommandHandler = require('../../structures/command/CommandHandler');

module.exports = class EvalCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'ping',
            alias: [],
            requirements: {
                onlyGuild: false,
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t}, args) {

    }
    
}