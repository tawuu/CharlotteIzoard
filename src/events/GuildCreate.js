const EventHandler = require('../structures/EventHandler');
const chalk = require('chalk')
const { CharlotteEmbed } = require("../utils")
const i18next = require("i18next")

module.exports = class guildCreate extends EventHandler {
    constructor(client) {
        super(client, 'guildCreate')
    }
    run(guild) {
        let t = i18next.getFixedT(this.getLocaleLanguage(guild.region))

        guild.fetchAuditLogs({
            type: "BOT_ADD"
        }).then(a => {

            let b = a.entries.filter(a => a.target.id === this.client.user.id).first()
            let user = b.executor
            let thanksEmbed = new CharlotteEmbed()
                .setColor("RANDOM")
                .setDescription(t("events:guildCreated.thanksForAdded", {
                    name: `**${this.client.user.tag}**`,
                    server: `**${guild.name}**`,
                    user: `**${user.tag}**`,
                    prefix: `-`
                }))
                .setAuthor(user.tag, user.displayAvatarURL())
                .setThumbnail(this.client.user.displayAvatarURL())
            user.send(thanksEmbed).catch(err => {
                console.log(chalk.red(`Eu não consegui enviar a mensagem para o ${chalk.blue(user.tag)}`))
            })
            
        }).catch(() => {
            console.log(chalk.red(`Eu não consegui acessar o Audit Logs da ${chalk.blue(guild.name)}`))
        })
    }
}