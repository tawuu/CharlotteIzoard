const { handleRequirements } = require('./CommandRequirements')

module.exports = class CommandHandler {
    constructor(client, options) {
        let {
            name,
            requirements = {},
            alias = [],
            category = "util"
        } = options;
        this.name = name
        this.requirements = requirements
        this.alias = alias
        this.category = category
        this.hidden = false
        this.client = client
        this.dir = null
    }
    _execute(ctx, args) {
        return new Promise((resolve, rej) => {

            try {
                handleRequirements(ctx, this.requirements)
            } catch (err) {
                return ctx.reply(err.message).catch(err2 => {
                    ctx.author.getDMChannel().then(channel => {
                        channel.createMessage(err.message).catch(err3 => {
                            console.log("Ai fode né, não consigo enviar mensagens no chat, e nem na DM do author da mensagem")
                        })
                    })
                })
            }

            try {
                resolve(this.execute(ctx, args))
            } catch(err) {
                return ctx.reply(err.message)
            }
        })
    }
    async execute () {}

    setT (t) {
        return this.t = t;
    }

}