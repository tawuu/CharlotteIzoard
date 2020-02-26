const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")


module.exports = class PurgeCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'clean',
            alias: ['limpar', "clear", "purge"],
            category: "mod",
            requirements: {
                permissions: [Permissions.manageMessages],
                botPermissions: [Permissions.manageMessages]
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, getUserAt, reply}, args) {
        let toPurge = await getUserAt(0, true);
        let amount = Number(toPurge ? args[1] : args[0])
        if (isNaN(amount)) reply(t("commands:purge.invalidNumber"))
        if (!toPurge) {
            channel.purge(amount).then(a => {
                reply(t("commands:purge.purgedSucessfully", {
                    amount
                }))  
            })
        } else {
            channel.purge(amount, (msg) => msg.author.id === toPurge.id).then(a => {
                reply(t("commands:purge.purgedUserSucessfully", {
                    amount,
                    user:toPurge.username
                }))
            })
        }

    }
}