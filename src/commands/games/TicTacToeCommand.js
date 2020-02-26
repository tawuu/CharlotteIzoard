const CommandHandler = require('../../structures/command/CommandHandler')
const TicTacToeBASE = require("../../structures/games/TicTacToe")
const { Constants: {Permissions} } = require("eris")

module.exports = class TicTacToeCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'tictactoe',
            alias: ['ttt', 'jogodavelha'],
            category: "games",
            requirements: {
                botPermissions: [Permissions.embedLinks, Permissions.attachFiles]
            }
        })

    }
    async execute ({member, voice, reply, prefix, author, t, getUserAt}, args) {
        const TicTac = new TicTacToeBASE(this.client)

        let user = await getUserAt(0)
        if (!user) return reply(t("commands:tictactoe.missingUserMention"))
        if (user.bot || user.id === author.id) return reply(t("commands:tictactoe.invalidFriend"))
        TicTac.participantes.push(author, user)

        TicTac.emotes = {
            "1": TicTac.participantes[0].id,
            "2": TicTac.participantes[1].id
        }

        reply(t('commands:tictactoe.solicitation', {
            receiver: user.mention,
            from: author.mention
        })).then(async a => {
            await a.addReaction('✅')
            const filter = (reaction, usr) => !usr.bot && usr.id === user.id && reaction.name === '✅'// && usr.id === user.id
            let collector = new this.client.utils.ReactionCollector(a, filter, { time: 10000, maxEmojis: 1 })

            collector.on("collect", async (r) => {

                // if (!result.size) {
                //     a.edit(t('commands:tictactoe.timeExpired', {
                //         user: user.mention,
                //         from: author.mention
                //     }))
                //     return
                // }
                a.delete()
                reply(t("commands:tictactoe.accepted", {
                    user: user.mention,
                    from: author.mention
                }))



                let canvas = await TicTac.generateTictactoeImage(TicTac.game)
            // let GameEmbed = new MessageEmbed()
            //     .setColor("RANDOM")
            //     .setTitle(t("commands:tictactoe.currentPlayer", {
            //         user: TicTac.participantes[TicTac.vez].tag
            //     }))
            //     .attachFiles(new MessageAttachment(canvas, 'tictactoe.png'))
            //     .setImage("attachment://tictactoe.png")
            //     .setFooter(t("commands:tictactoe.sendNumber"))
            //     .setDescription(`:o: **${TicTac.participantes[0].tag}**\n:x: **${TicTac.participantes[1].tag}**`)

                reply({
                    content: user.mention + author.mention,
                    embed: {
                        title: t("commands:tictactoe.currentPlayer", {
                            user: TicTac.participantes[TicTac.vez].tag
                        }),
                        description: `:o: **${TicTac.participantes[0].tag}**\n:x: **${TicTac.participantes[1].tag}**`,
                        footer: {
                            text: t("commands:tictactoe.sendNumber")
                        },
                        image: {
                            url: "attachment://tictactoe.png"
                        }
                    }
                }, {
                    file: canvas,
                    name: "tictactoe.png"
                }).then(async cc => {
                    TicTac.createCollector(cc, cc.channel, t)
                })
            })
            
        })
    }

}