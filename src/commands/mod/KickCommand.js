const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")


module.exports = class KickCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'kick',
            alias: ['expulsar', "vaza"],
            category: "mod",
            requirements: {
                permissions: [Permissions.kickMembers],
                botPermissions: [Permissions.kickMembers]
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, getUserAt, reply}, args) {
        let toKick = await getUserAt(0, true);
        if (!toKick) return reply(t("commands:kick.mentionUser"));

        let reason = args.slice(1).join(" ") || t("commands:kick.noReason");
        toKick.kick(reason)
            .then(() => {
                reply(t("commands:kick.kickedSucessfully"));
            })
                .catch(err => {
                    reply(t("commands:kick.cannotKickThisUser"));
            });

    }
}