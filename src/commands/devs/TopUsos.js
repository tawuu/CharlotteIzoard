const CommandHandler = require('../../structures/command/CommandHandler');
const util = require('util')

module.exports = class TopUsosCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'topusos',
            alias: ["usestop"],
            category: "devs",
            requirements: {
                onlyDevs: true,
            }
        })
    }
    async execute ({guild, member, reply, prefix, author, t, user, dbBot, dbGuild, me}, args) {


        let cmds = dbBot.commands

        let sorted = cmds.sort((a, b) => b.uses - a.uses)
            .map(a => a._id + " " + a.uses)
            .slice(0, 10)
            .join("\n")

        reply(sorted, {
            code: "js"
        })
    }
}