const CommandHandler = require('../../structures/command/CommandHandler');
const { Permissions } = require('discord.js');

module.exports = class SlowmodeCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'slowmode',
            alias: ['modolento'],
            category: "mod",
            requirements: {
                permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
                botPermissions: [Permissions.FLAGS.MANAGE_CHANNELS]
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, getUserAt, reply}, args) {
        let nmbr = Number(args[0])
        if (isNaN(nmbr) && !nmbr) return reply(t("commands:slowmode.invalidNumber"))

        channel.setRateLimitPerUser(Number(nmbr)).then(() => {
            reply(t("commands:slowmode.slowmodeChanged", {
                x: nmbr
            }))
        }).catch(err => {
            reply(t("commands:slowmode.cannotChange"))
        })
    }
}