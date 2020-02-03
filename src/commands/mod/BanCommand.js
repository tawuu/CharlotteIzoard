const CommandHandler = require('../../structures/command/CommandHandler');
const { Permissions } = require('discord.js');

module.exports = class BanCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'ban',
            alias: ['banir', "hackban"],
            category: "mod",
            requirements: {
                permissions: [Permissions.FLAGS.BAN_MEMBERS],
                botPermissions: [Permissions.FLAGS.BAN_MEMBERS]
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, getUserAt, reply}, args) {
        let toBan = await getUserAt(0, true);
        if (!toBan) return reply(t("commands:ban.mentionUser"));

        if (toBan.bannable) {
            let reason = args.slice(1).join(" ") || t("commands:ban.noReason");
            guild.members.ban(toBan, {
                reason,
                days: 7
            }).then(GuildMember => {
                reply(t("commands:ban.bannedSucessfully"));
            }).catch(err => {
                reply(t("commands:ban.cannotBanThisUser"));
            });
        } else {
            reply(t("commands:ban.cannotBanThisUser"));
        }
    }
}