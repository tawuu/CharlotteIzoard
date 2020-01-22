const EventHandler = require('../structures/EventHandler');
const chalk = require('chalk')

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'shardReady')
    }
    run () {
        console.log(`test`)
    }

}