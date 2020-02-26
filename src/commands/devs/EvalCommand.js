const CommandHandler = require('../../structures/command/CommandHandler');
const util = require('util')

module.exports = class EvalCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'eval',
            alias: [],
            category: "devs",
            requirements: {
                onlyDevs: true,
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, user, dbBot, dbGuild, reply}, args) {
        try {
            let Canvas = require("canvas");
            let evaled = await eval(args.join(' ').replace(/(^`{3}(\w+)?|`{3}$)/g, ''))
            let cleanEvaled = this.clean(util.inspect(evaled, { depth: 0 }))
            cleanEvaled = cleanEvaled.replace(new RegExp(`${this.client.token}`, "g"), "undefined")
            if (cleanEvaled.length > 1800) {
                cleanEvaled = cleanEvaled.slice(0, 1800) + "..."
            }
            await reply("```"+cleanEvaled+"```")
        } catch (err) {
            reply('`Erro` ```xl\n' + this.clean(err) + '\n```')
        }
    }

    clean (text) {
        const blankSpace = String.fromCharCode(8203)
        return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
    }

}