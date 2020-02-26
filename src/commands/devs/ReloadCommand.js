const CommandHandler = require('../../structures/command/CommandHandler');

module.exports = class ReloadCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'reload',
            alias: ['r'],
            category: "devs",
            requirements: {
                onlyDevs: true,
                onlyGuild: false,
            }
        })
    }
    async execute ({guild, member, voice, reply, prefix, author, t}, args) {
        try {

            if (args[0]) {
                this.client.reloadCommand(args[0])
                reply(args[0] === "all" ? "Todos os comandos foram recarregados" : `O comandos ${args[0]} foi recarregado lol`)
            } else {
                reply("Indique o nome do comando")
            }

        } catch (err) {
            reply(`Não consegui recarregar o comando`)
        }
    }


}