const CommandHandler = require('../../structures/command/CommandHandler');
const { Permissions: { FLAGS } } = require('discord.js');
const parse = require('parse-duration')

module.exports = class MuteCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'mute',
            alias: ['mutar', "silenciar"],
            category: "mod",
            requirements: {
                permissions: [FLAGS.MANAGE_CHANNELS, FLAGS.MANAGE_MESSAGES],
                botPermissions: [FLAGS.MANAGE_CHANNELS, FLAGS.MANAGE_ROLES]
            }
        })
    }
    async execute({ guild, member, voice, channel, prefix, author, t, getUserAt, reply, dbGuild }, args) {
        let user = await getUserAt(0, true);
        if (!user) return reply(t("commands:mute.mentionUser"))

        let reason = args.slice(1).join(" ") || t("commands:mute.unreason")

        let role = guild.roles.cache.find(r => r.name === "Charlotte's Muted")
        if (!role) {
            role = await guild.roles.create({
                data: {
                    name: "Charlotte's Muted",
                    color: "#000000",
                    permissions: []
                }
            })
            guild.channels.forEach(async (aaaa, id) => {
                aaaa.overwritePermissions({
                    permissionOverwrites: [
                        {
                            id: role.id,
                            deny: ["SEND_MESSAGES", "ADD_REACTIONS", "SPEAK", "CONNECT"]
                        }
                    ]
                })
            });
        }

        reply(t("commands:mute.sayTheTime"))
        let filter = (ur) => ur.author.id === author.id;
        const collector = await channel.createMessageCollector(filter);
        collector.on("collect", async (msg) => {
            msg.content = msg.content
                .replace(/(meses|mêses|mes|mês)/ig, "months")
                .replace(/(minuto|minutos)/ig, "min")
                .replace(/(hora|horas)/ig, "hours")
                .replace(/(semana|semanas)/ig, "weeks")
                .replace(/(dia|dias)/ig, "weeks")
            
            let time = parse(msg.content)
            collector.stop()
            if (time < 60000) return reply(t("commands:mute.invalidTime"))
            if (time > 7889400000) return reply(t("commands:mute.maxTime"))

            dbGuild.mutedUsers.set(user.id, {
                reason,
                time
            })
            dbGuild.save()
            user.roles.add(role.id).then(() => {
                reply(t("commands:mute.mutedSucessfully"))
            }).catch(err => {
                reply(t("commands:mute.cannotMute"))
            })
        })
    }
}