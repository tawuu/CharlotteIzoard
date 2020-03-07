const EventHandler = require('../structures/EventHandler');
const chalk = require('chalk')

const i18next = require("i18next")

module.exports = class guildCreate extends EventHandler {
    constructor(client) {
        super(client, 'guildCreate')
    }
    async run(guild) {
        let t = i18next.getFixedT(this.getLocaleLanguage(guild.region))
        let guildDB = await this.client.database.guilds.findById(guild.id);
        if (!guildDB) {
            guildDB = new this.client.database.guilds({
                _id: guild.id
            }).save()
        }


        guild.getAuditLogs(3, null, 28).then(a => {

            let b = a.entries[0]
            let user = b.user

            user.getDMChannel().then(channel => {
                console.log(channel.id)
                channel.createMessage({
                    embed: {
                        description: t("events:guildCreated.thanksForAdded", {
                            name: `**${this.client.user.tag}**`,
                            server: `**${guild.name}**`,
                            user: `**${user.tag}**`,
                            prefix: `-`
                        }),
                        author: {
                            name: user.tag,
                            icon_url: user.avatarURL
                        },
                        thumbnail: {
                            url: this.client.user.avatarURL
                        },
                        color: "#ff3df8".toVBColor()
                    }
                }).catch(err => {
                    console.log(chalk.red(`Eu não consegui enviar a mensagem para o ${chalk.blue(user.tag)} `))
                })
            }).catch(err => {
                console.log("Não consegui acessar o DM Channel")
            })
            
        }).catch(() => {
            console.log(chalk.red(`Eu não consegui acessar o Audit Logs da ${chalk.blue(guild.name)}`))
        })
    }
}