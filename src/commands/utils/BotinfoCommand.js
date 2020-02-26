const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")

module.exports = class BotinfoCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            alias: ['bi'],
            category: "utils",
            requirements: {
                botPermissions: [Permissions.embedLinks, Permissions.attachFiles]
            }
        })
    }
    async execute({ guild, member, reply, prefix, author, t, dbBot }, args) {
        let owner = await this.client.getRESTUser(dbBot.staffers.owners[0])
        reply({
            embed: {
                author: {
                    name: author.username,
                    icon_url: author.avatarURL
                },
                title: t("commands:botinfo.myPrefix", {
                    prefix
                }),
                description: t("commands:botinfo.aboutMe", {
                    name: this.client.user.username,
                    version: require("eris").VERSION,
                    users: this.client.users.size,
                    servers: this.client.guilds.size,
                    owner: owner.username,
                    commands: this.client.commands.size
                }),
                fieds: [
                    {
                        name: "🐱 Github",
                        value: t("commands:botinfo.clickhere", {
                            url: "https://github.com/ItzNerd/CharlotteIzoard"
                        })
                    }
                ],
                footer: {
                    text: t("commands:botinfo.createdBy", {
                        owners: owner.username
                    }),
                    icon_url: owner.avatarURL
                },
                thumbnail: {
                    url: this.client.user.avatarURL
                }
            }
        })

    }

}