const { handleRequirements } = require('./CommandRequirements')

module.exports = class CommandHandler {
    constructor(client, options) {
        let {
            name,
            requirements = {},
            alias = [],
        } = options;
        this.name = name
        this.requirements = requirements
        this.alias = alias
        this.hidden = false
        this.client = client

    }
    _execute (ctx, args) {
        try {
            handleRequirements(ctx, this.requirements)
        } catch(err) {
            
        }
        
        
        this.execute(ctx, args)
    }
    async execute () {}

    setT (t) {
        return this.t = t;
    }

}