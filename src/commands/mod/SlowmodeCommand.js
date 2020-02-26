const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")

module.exports = class SlowmodeCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'slowmode',
            alias: ['modolento'],
            category: "mod",
            requirements: {
                permissions: [Permissions.manageChannels],
                botPermissions: [Permissions.manageChannels]
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, getUserAt, reply}, args) {
        let nmbr = Number(args[0])
        if (isNaN(nmbr) && !nmbr) return reply(t("commands:slowmode.invalidNumber"))

        channel.edit({
            rateLimitPerUser: Number(nmbr)
        }).then(() => {
            reply(t("commands:slowmode.slowmodeChanged", {
                x: nmbr
            }))
        }).catch(err => {
            reply(t("commands:slowmode.cannotChange"))
        })
    }
}