const CommandHandler = require('../../structures/command/CommandHandler');
const util = require('util')

module.exports = class ManutencaoCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'manutencao',
            alias: ["manutenção", "maintenance"],
            category: "devs",
            requirements: {
                onlyDevs: true,
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, user, dbBot, dbGuild, CharlotteEmbed, me, reply}, args) {

        if (!args[0]) return reply("Fala o nome do comando")
        let comando = this.client.commands.get(args[0]) || this.client.alias.get(this.client.commands.get(args[0]))
        if (!comando) return reply("Fala um comando valido")
        let cmd = dbBot.commands.find(a => a.commandName === comando.name)
        if (!cmd.maintenance) {
            cmd.maintenance = true
            cmd.maintenanceReason = args.slice(1).join(" ") || "Nenhum motivo especificado"
            reply("Comando foi adicionado na manutenção")
        } else {
            cmd.maintenance = false
            cmd.maintenanceReason = "None."
            reply("Comando foi removida na manutenção")
        }
        dbBot.save()

    }
}