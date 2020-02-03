const EventHandler = require('../structures/EventHandler');
const CommandContext = require('../structures/command/CommandContext');
const i18next = require('i18next');
const { GuildChannel } = require("discord.js")

module.exports = class MessageReceive extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }
    async run (message) {
        let prefix = this.client.user.username.toLowerCase().endsWith("canary") ? "c-" : '-';
        if (message.channel.type === "dm") return;
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        let bot = await this.client.database.me.findById(process.env.client_id);
        if (!bot) {
            bot = new this.client.database.me({
                _id: process.env.client_id
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
            guild = new this.client.database.guilds({
                _id: message.guild.id
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
            user,
            bot,
            guild
        });

        cmd._execute(context, args)

    }
};