const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")


module.exports = class BanCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'ban',
            alias: ['banir', "hackban"],
            category: "mod",
            requirements: {
                permissions: [Permissions.banMembers],
                botPermissions: [Permissions.banMembers]
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, getUserAt, reply}, args) {
        let toBan = await getUserAt(0, true);
        if (!toBan) return reply(t("commands:ban.mentionUser"));

        let reason = args.slice(1).join(" ") || t("commands:ban.noReason");
        toBan.ban(7,reason).then(() => {
            reply(t("commands:ban.bannedSucessfully"));
        }).catch(err => {
            reply(t("commands:ban.cannotBanThisUser"));
        });
    }
}