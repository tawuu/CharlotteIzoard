const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")
const parse = require('parse-duration')

module.exports = class MuteCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'mute',
            alias: ['mutar', "silenciar"],
            category: "mod",
            requirements: {
                permissions: [Permissions.manageChannels, Permissions.manageMessages],
                botPermissions: [Permissions.manageChannels, Permissions.manageRoles]
            }
        })
    }
    async execute({ guild, member, voice, channel, prefix, author, t, getUserAt, reply, dbGuild }, args) {
        let user = await getUserAt(0, true);
        if (!user) return reply(t("commands:mute.mentionUser"))

        let reason = args.slice(1).join(" ") || t("commands:mute.unreason")

        let role = guild.roles.find(r => r.name === "Charlotte's Muted")
        if (!role) {
            role = await this.client.createRole(guild.id, {
                name: "Charlotte's Muted"
            })
            guild.channels.forEach(async (channel) => {
                let deny = Permissions.sendMessages+Permissions.addReactions
                channel.editPermission(role.id, null, deny, "role")
            });
        }

        reply(t("commands:mute.sayTheTime")).then(m => {

            let filter = (ur) => ur.author.id === author.id;
            const collector = new this.client.utils.MessageCollector(m.channel, filter, {
                time: 60000
            });
            collector.on("collect", async (msg) => {

                msg.content = msg.content
                    .replace(/(meses|mêses|mes|mês)/ig, "months")
                    .replace(/(minuto|minutos)/ig, "min")
                    .replace(/(hora|horas)/ig, "hours")
                    .replace(/(semana|semanas)/ig, "weeks")
                    .replace(/(dia|dias)/ig, "weeks")
                
                let time = parse(msg.content)
                collector.stopListeners()
                if (time < 60000) return reply(t("commands:mute.invalidTime"))
                if (time > 7889400000) return reply(t("commands:mute.maxTime"))

                dbGuild.mutedUsers.set(user.id, {
                    reason,
                    time
                })
                dbGuild.save()
                user.addRole(role.id).then(() => {
                    reply(t("commands:mute.mutedSucessfully"))
                }).catch(err => {
                    reply(t("commands:mute.cannotMute"))
                })
            })
        })
    }
}