const EventHandler = require('../structures/EventHandler');
const chalk = require('chalk')

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'ready')
    }
    run () {
        console.log(`A super ${chalk.hex('#ff0ab1')('Charlotte')} está online`)

        // let arr = ['users', 'guilds', 'channels', "emojis"]
        // for (let a of arr) {
        //     this.getAll(a)
        // }
    }
    getAll (name) {
        this.client.shard.broadcastEval('this.' + name)
            .then(results => {
                let totalResult = []
                for (let arrayGuild of results) {
                    for (let guildList of arrayGuild) {
                        totalResult.push(guildList)
                    }
                }
        this.client[`all${name.slice(0,1).toUpperCase()+name.slice(1)}`] = totalResult
      })
        .catch(console.error);
    }
}