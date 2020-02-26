const CommandHandler = require('../../structures/command/CommandHandler');
const { Constants: {Permissions} } = require("eris")


module.exports = class HelpCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'help',
            alias: ['ajuda'],
            category: "utils",
            requirements: {
                botPermissions: [Permissions.embedLinks]
            }
        })
    }
    async execute ({guild, member, voice, reply, prefix, author, t}, args) {
        reply({
            embed: {
                author: {
                    name: author.username,
                    icon_url: author.avatarURL
                },
                thumbnail: {
                    url: this.client.user.avatarURL
                },
                fields: [
                    {
                        name: `👮 ${t('help:moderation')}`,
                        value: this.getCommands("mod") || t("help:noCommands")
                    },
                    {
                        name: `⚙ ${t('help:utils')}`,
                        value: this.getCommands("utils") || t("help:noCommands")
                    },
                    {
                        name: `🎮 ${t('help:videogame')}`,
                        value: this.getCommands("games") || t("help:noCommands")
                    }
                ]
            }
        })

    }
    getCommands (category) {
        return this.client.commands.filter(a => a.category === category).map(a => `\`${a.name}\``).join(", ")
    }
}