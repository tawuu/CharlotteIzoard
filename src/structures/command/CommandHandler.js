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
            ctx.reply(err.message)
        }
        
        
        this.execute(ctx, args)
    }
    async execute () {}

    setT (t) {
        return this.t = t;
    }

}