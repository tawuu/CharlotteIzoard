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
    _execute (ctx, args) {
        try {
            handleRequirements(ctx, this.requirements)
        } catch(err) {
            return ctx.reply(err.message)
        }

        try {
            this.execute(ctx, args)
        } catch(err) {
            return ctx.reply(err.message)
        }
    }
    async execute () {}

    setT (t) {
        return this.t = t;
    }

}