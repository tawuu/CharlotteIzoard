const CommandHandler = require('../../structures/command/CommandHandler');
const { Permissions } = require('discord.js');

module.exports = class UnlockCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'unlock',
            alias: ['destrancar', "abrir", "open"],
            category: "mod",
            requirements: {
                permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
                botPermissions: [Permissions.FLAGS.MANAGE_CHANNELS]
            }
        })
    }
    async execute({ guild, reply, channel, author, t, getUserAt }, args) {

        if (channel.permissionOverwrites.get(guild.id).allow.toArray().includes("SEND_MESSAGES")) return reply(t("commands:unlock.channelAlreadyUnlocked")) 
        channel.overwritePermissions({
            permissionOverwrites: [
                {
                    id: guild.id,
                    allow: ['SEND_MESSAGES'],
                },
            ],
            reason: 'Unlock Command'
        }).then(() => {
            reply(t("commands:unlock.channelUnlockedSucessfully"))
        }).catch((err) => {
            reply(t("commands:unlock.cannotUnlock"))
        })
    }
}