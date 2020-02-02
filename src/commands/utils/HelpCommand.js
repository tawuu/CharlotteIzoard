const CommandHandler = require('../../structures/command/CommandHandler');
const {MessageEmbed} = require('discord.js')

module.exports = class HelpCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'help',
            alias: ['ajuda'],
            category: "utils",
            requirements: {
                onlyGuild: false,
            }
        })
    }
    async execute ({guild, member, voice, channel, prefix, author, t}, args) {
        let HelpEmbed = new MessageEmbed()
            .setAuthor(author.tag, author.displayAvatarURL())
            .setTitle(t("help:myCommands"))
            .addField(`🎮 ${t('help:moderation')}`, this.getCommands("games") || t("help:noCommands"))
            .addField(`⚙ ${t('help:utils')}`, this.getCommands("utils") || t("help:noCommands"))
            .addField(`🎮 ${t('help:videogame')}`, this.getCommands("games") || t("help:noCommands"))
            .setColor("RANDOM")
            .setThumbnail(this.client.user.displayAvatarURL())
            channel.send(HelpEmbed)

    }
    getCommands (category) {
        return this.client.commands.filter(a => a.category === category).map(a => `\`${a.name}\``).join(", ")
    }
}