const EventHandler = require('../structures/EventHandler');
const CommandContext = require('../structures/command/CommandContext');
const i18next = require('i18next');
const {DMChannel} = require("discord.js")

module.exports = class MessageReceive extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }
    async run (message) {
        let prefix = message.channel.type === "dm" ? "" : this.client.user.username.toLowerCase().endsWith("canary") ? "c-" : '-';
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        let bot = await this.client.database.me.findById(this.client.user.id);
        if (!bot) {
            bot = new this.client.database.me({
                _id: this.client.user.id
            }).save()
        }
        let user = await this.client.database.users.findById(message.author.id);
        if (!user) {
            user = new this.client.database.users({
                _id: message.author.id
            }).save()
        }
        let guild = await this.client.database.guilds.findById(message.guild.id);
        if (!guild) {
            if (message.channel instanceof !DMChannel) {
                guild = new this.client.database.guilds({
                    _id: message.guild.id
                }).save()
            } else {
                console.log('n')
            }
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
            user,
            bot,
            guild
        });

        cmd._execute(context, args)

    }
};