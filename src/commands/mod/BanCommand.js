const CommandHandler = require('../../structures/command/CommandHandler');
const { Permissions } = require('discord.js')
const util = require('util')

module.exports = class EvalCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'ban',
            alias: ['banir', 'hackban'],
            requirements: {
                permissions: [Permissions.FLAGS.BAN_MEMBERS],
                botPermissions: [Permissions.FLAGS.BAN_MEMBERS]
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t}, args) {

    }
    
}