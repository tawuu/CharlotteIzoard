const EventHandler = require('../structures/EventHandler');
const CommandContext = require('../structures/command/CommandContext');
const i18next = require('i18next');

module.exports = class MessageReceive extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }
    async run (message) {
        let prefix = '-';
        if (message.channel.type === "dm") return;
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        let user = await this.client.database.users.findById(message.author.id);
        if (!user) {
            user = new this.client.database.users({
                _id: message.author.id
            }).save()
        }

        let args = message.content.slice(prefix.length).trim().split(/ /g);
        let command = args.shift().toLowerCase();
        let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.alias.get(command));
        if (!cmd) return;
        let t;
        const setFixedT = function (translate) { t = translate };
        setFixedT(i18next.getFixedT('pt-BR'));

        let context = new CommandContext(this.client, {
            message,
            prefix,
            t,
            user
        });

        cmd._execute(context, args)

    }
};