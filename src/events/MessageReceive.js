const EventHandler = require('../structures/EventHandler');

module.exports = class MessageReceive extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }
    run (message) {
        
    }
}