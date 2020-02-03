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
                onlyGuild: false,
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t, user, dbBot, dbGuild}, args) {
        try {
            const {Collection, MessageAttachment, MessageEmbed} = require('discord.js')
            const evaled = await eval(args.join(' ').replace(/(^`{3}(\w+)?|`{3}$)/g, ''))
            const cleanEvaled = this.clean(util.inspect(evaled, { depth: 0 }))
            await channel.send(cleanEvaled, { code: 'xl' })
        } catch (err) {
            channel.send('`Erro` ```xl\n' + this.clean(err) + '\n```')
        }
    }
      
    clean (text) {
        const blankSpace = String.fromCharCode(8203)
        return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
    }
    
}