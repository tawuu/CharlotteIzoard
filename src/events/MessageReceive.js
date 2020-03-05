const EventHandler = require('../structures/EventHandler');
const CommandContext = require('../structures/command/CommandContext');
const i18next = require('i18next');
const didyoumean = require("didyoumean2").default

module.exports = class MessageReceive extends EventHandler {
    constructor(client) {
        super(client, 'messageCreate')
    }
    async run ({content, author, channel, member}) {
        let guild = channel.guild
        if (channel.type === 1) return;
        if (author.bot) return;
        
        let t;
        const setFixedT = function (translate) { t = translate };
        setFixedT(i18next.getFixedT('pt-BR'));
        


        let bot = await this.client.database.me.findById(process.env.client_id);
        if (!bot) {
            bot = new this.client.database.me({
                _id: process.env.client_id
            }).save()
        }

        let guildDB = await this.client.database.guilds.findById(guild.id);
        if (!guildDB) {
            guildDB = new this.client.database.guilds({
                _id: guild.id
            }).save()
        }

        let prefix = guildDB.settings.prefix ? guildDB.settings.prefix : this.client.user.username.toLowerCase().endsWith("canary") ? "c-" : '-';
        
        if (content.replace(/[!<>@]/g, "") === this.client.user.id.toString()) {
            this.client.createMessage(channel.id, t("events:mention", {
                prefix
            }))
        }


        if (!content.startsWith(prefix)) return;
        let user = await this.client.database.users.findById(author.id);
        if (!user) {
            user = new this.client.database.users({
                _id: author.id
            }).save()
        }
        let args = content.slice(prefix.length).trim().split(/ /g);
        let command = args.shift().toLowerCase();
        let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.alias.get(command));
        let context = new CommandContext(this.client, {
            guild,
            author,
            channel,
            member,
            content,
            prefix,
            t,
            user,
            bot,
            guildDB,
        });

        if (!cmd) {
            
            if (guildDB.settings.unavailableCommand) {
                let posibility = []
                this.client.commands.forEach(a => {
                    posibility.push(a.name)
                })
                this.client.alias.forEach(a => {
                    posibility.push(a.name)
                })
                let best = didyoumean(command, posibility)
                if (typeof best === "array") best = best[0]
                context.reply(t("events:unavailableCommand", {
                    subtext: best ? t("events:didyouMean", {
                        command: best
                    }) : t("events:tryHelp"),
                    command
                }))        
            }
            return;
        }
        let commandDb = await this.client.database.me.findById(process.env.client_id);
        let com = commandDb.commands.find(a => a._id === cmd.name)
        if (com) {
            if (com.maintenance) return context.reply(t("events:commandWithMaintenance", {
                reason: com.maintenanceReason
            }))
            com.uses += 1
            commandDb.save()
        }
        this.client.sendChannelTyping(channel.id)
        cmd._execute(context, args).catch(err => {
            context.reply("Não consegui fazer a finalização deste comando: ```js\n"+err.message+"```")
        })

    }
};