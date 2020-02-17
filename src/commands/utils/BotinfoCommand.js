const CommandHandler = require('../../structures/command/CommandHandler');
const {Permissions: {FLAGS}} = require("discord.js")
module.exports = class BotinfoCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            alias: ['bi'],
            category: "utils",
            requirements: {
                botPermissions: [FLAGS.EMBED_LINKS, FLAGS.ATTACH_FILES]
            }
        })
    }
    async execute({ guild, member, channel, prefix, author, t, CharlotteEmbed, dbBot }, args) {
        
        let owner = await this.client.users.fetch(dbBot.staffers.owners[0])
        let BiEmbed = new CharlotteEmbed()
            .setAuthor(author.tag, author.displayAvatarURL())
            .setTitle(t("commands:botinfo.myPrefix", {
                prefix
            }))
            .setDescription(t("commands:botinfo.aboutMe", {
                name: this.client.user.username,
                version: require("discord.js").version,
                users: this.client.users.size,
                servers: this.client.guilds.size,
                owner: owner.tag,
                commands: this.client.commands.size
            }))
            .addField("🐱 Github", t("commands:botinfo.clickhere", {
                url: "https://github.com/ItzNerd/CharlotteIzoard"
            }))
            .setFooter(t("commands:botinfo.createdBy", {
                owners: owner.tag
            }), owner.displayAvatarURL())
            .setThumbnail(this.client.user.displayAvatarURL())
            channel.send(BiEmbed)

    }

}