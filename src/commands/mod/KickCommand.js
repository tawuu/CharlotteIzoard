const CommandHandler = require('../../structures/command/CommandHandler');
const { Permissions } = require('discord.js');

module.exports = class KickCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'kick',
            alias: ['expulsar', "vaza"],
            category: "mod",
            requirements: {
                permissions: [Permissions.FLAGS.KICK_MEMBERS],
                botPermissions: [Permissions.FLAGS.KICK_MEMBERS]
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, getUserAt, reply}, args) {
        let toKick = await getUserAt(0, true);
        if (!toKick) return reply(t("commands:kick.mentionUser"));

        if (toKick.kickable) {
            let reason = args.slice(1).join(" ") || t("commands:kick.noReason");
            toKick.kick(reason)
                .then(GuildMember => {
                    reply(t("commands:kick.kickedSucessfully"));
                })
                    .catch(err => {
                        reply(t("commands:kick.cannotKickThisUser"));
                });
        } else {
            reply(t("commands:kick.cannotKickThisUser"));
        }
    }
}