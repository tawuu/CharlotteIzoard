const CommandHandler = require('../../structures/command/CommandHandler')
const { MessageEmbed, MessageAttachment } = require("discord.js")
const TicTacToeBASE = require("../../structures/games/TicTacToe")

module.exports = class TicTacToeCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'tictactoe',
            alias: ['ttt', 'jogodavelha'],
            category: "games",
            requirements: {
            }
        })

    }
    async execute ({guild, member, voice, channel, prefix, author, t, getUserAt}, args) {
        const TicTac = new TicTacToeBASE(this.client)

        let user = await getUserAt(0)
        if (!user) return channel.send(t("commands:tictactoe.missingUserMention"))
        if (user.bot || user.id === author.id) return channel.send(t("commands:tictactoe.invalidFriend"))
        TicTac.participantes.push(author, user)
        
        TicTac.emotes = {
            "1": TicTac.participantes[0].id,
            "2": TicTac.participantes[1].id
        }

        channel.send(t('commands:tictactoe.solicitation', {
            receiver: user.toString(),
            from: author.toString()
        })).then(async a => {
            await a.react('✅')
            const filter = (reaction, usr) => !usr.bot && reaction.emoji.name === '✅'// && usr.id === user.id
            let result = await a.awaitReactions(filter, { time: 10000, maxEmojis: 1 })

            if (!result.size) {
                a.reactions.removeAll()
                a.edit(t('commands:tictactoe.timeExpired', {
                    user: user.toString(),
                    from: author.toString()
                }))
                return
            }
            a.delete()
            a.channel.send(t("commands:tictactoe.accepted", {
                user: user.toString(),
                from: author.toString()
            }))



            let canvas = await TicTac.generateTictactoeImage(TicTac.game)
            let GameEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(t("commands:tictactoe.currentPlayer", {
                    user: TicTac.participantes[TicTac.vez].tag
                }))
                .attachFiles(new MessageAttachment(canvas, 'tictactoe.png'))
                .setImage("attachment://tictactoe.png")
                .setFooter(t("commands:tictactoe.sendNumber"))
                .setDescription(`:o: **${TicTac.participantes[0].tag}**\n:x: **${TicTac.participantes[1].tag}**`)
           
            channel.send(user.toString() + author.toString(), GameEmbed).then(async cc => {
                TicTac.createCollector(cc, channel, t)
            })
        
        })
    }

}