const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")

module.exports = class UnlockCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'unlock',
            alias: ['destrancar', "abrir", "open"],
            category: "mod",
            requirements: {
                permissions: [Permissions.manageChannels],
                botPermissions: [Permissions.manageChannels]
            }
        })
    }
    async execute({ guild, reply, channel, author, t, getUserAt }, args) {
        let permission = channel.permissionOverwrites.get(guild.id).json.readMessages
        if (permission !== false) return reply(t("commands:unlock.channelAlreadyUnlocked")) 
        channel.editPermission(guild.id, Permissions.sendMessages, null, "role").then(() => {
            reply(t("commands:unlock.channelUnlockedSucessfully"))
        }).catch((err) => {
            reply(t("commands:unlock.cannotUnlock"))
        })
    }
}   