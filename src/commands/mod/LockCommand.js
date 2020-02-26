const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")

module.exports = class LockCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'lock',
            alias: ['trancar'],
            category: "mod",
            requirements: {
                permissions: [Permissions.manageChannels],
                botPermissions: [Permissions.manageChannels]
            }
        })
    }
    async execute({ guild, reply, channel, author, t, getUserAt }, args) {
        let permission = channel.permissionOverwrites.get(guild.id).json.readMessages
        if (permission !== true && permission !== undefined) return reply(t("commands:lock.channelAlreadyLocked")) 
        channel.editPermission(guild.id, null, Permissions.sendMessages, "role").then(() => {
            reply(t("commands:lock.channelLockedSucessfully"))
        }).catch((err) => {
            reply(t("commands:lock.cannotLock"))
        })
    }
}