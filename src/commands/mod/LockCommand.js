const CommandHandler = require('../../structures/command/CommandHandler');
const { Permissions } = require('discord.js');

module.exports = class LockCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'lock',
            alias: ['trancar'],
            category: "mod",
            requirements: {
                permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
                botPermissions: [Permissions.FLAGS.MANAGE_CHANNELS]
            }
        })
    }
    async execute({ guild, reply, channel, author, t, getUserAt }, args) {

        if (channel.permissionOverwrites.get(guild.id).deny.toArray().includes("SEND_MESSAGES")) return reply(t("commands:lock.channelAlreadyLocked")) 
        channel.overwritePermissions({
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: ['SEND_MESSAGES'],
                },
            ],
            reason: 'Lock Command'
        }).then(() => {
            reply(t("commands:lock.channelLockedSucessfully"))
        }).catch((err) => {
            reply(t("commands:lock.cannotLock"))
        })
    }
}