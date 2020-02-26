const EventHandler = require('../structures/EventHandler');
const chalk = require('chalk')

module.exports = class ClientOnReady extends EventHandler {
    constructor(client) {
        super(client, 'ready')
    }
    run () {
        console.log(`A super ${chalk.hex('#ff0ab1')('Charlotte')} está online`)

        this.client.editStatus("dnd", {
            name: "Esto Online Amsx",
            type: 3

        })

        // this.loadCommandsDatabase()

    }

    async loadCommandsDatabase() {
        if (!this.client.database.ok) return;
        let me = await this.client.database.me.findById(process.env.CLIENT_ID)
        this.client.commands.forEach(async (command) => {
            if (command.category === "devs") return;
            if (!me.commands.find(a => a._id === command.name)) {
                me.commands.push({
                    _id: command.name
                })
            }
        })
        me.save()
    }
}