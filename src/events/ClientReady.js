const EventHandler = require('../structures/EventHandler');
const chalk = require('chalk')

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'ready')
    }
    run () {
        
        console.log(`A super ${chalk.hex('#ff0ab1')('Charlotte')} está online`)
    }
}