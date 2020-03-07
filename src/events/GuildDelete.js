const EventHandler = require('../structures/EventHandler');

module.exports = class guildDelete extends EventHandler {
    constructor(client) {
        super(client, 'guildDelete')
    }
    async run(guild) {
        await this.client.database.guilds.findByIdAndDelete(guild.id)
    }
}