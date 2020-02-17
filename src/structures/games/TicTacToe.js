const {MessageEmbed, MessageAttachment} = require('discord.js')

class TicTacToeGame {
    constructor(client) {
        this.client = client;
        this.game = [
            [null,null,null],[null,null,null],[null,null,null]
        ]
        this.participantes = [];
        this.vez = 0;
        let emotes = {}
        this.numeros = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣']
        this.winConditions = [
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [0, 1], [0, 2]],
            [[0, 1], [1, 1], [2, 1]],
            [[1, 0], [1, 1], [1, 2]]
        ]
        this.jogada = 0
    }

    async updateEmbed (message, channel, t, winner) {
        let canvas = await this.generateTictactoeImage(this.game)
        if ([0,1].includes(winner)) {
            message.delete()
            channel.send(this.participantes[winner].toString(), new MessageEmbed({
                title: t("commands:tictactoe.congradulations"),
                description: `:o: **${this.participantes[0].tag}**\n:x: **${this.participantes[1].tag}**\n\n` + t("commands:tictactoe.hasWinner", {
                    winner: this.participantes[winner].toString()
                }),
                image: {
                    url: `attachment://winner.png`
                },
                files: [{
                    attachment: canvas, 
                    name: `winner.png`
                }]
            }).setColor("RANDOM"))
        }  else if (this.jogada >= 9) {
            message.delete()
            channel.send(this.participantes[0].toString()+this.participantes[1].toString(), new MessageEmbed({
                title: t("commands:tictactoe.noHasWinner"),
                description: `:o: **${this.participantes[0].tag}**\n:x: ${this.participantes[1].tag}\n\n`+t("commands:tictactoe.noWinnerMessage"),
                image: {
                    url: `attachment://empate.png`
                },
                files: [{
                    attachment: canvas, 
                    name: `empate.png`
                }]
            }).setColor("RANDOM"))
        } else {
            let nomeALE = Math.floor(Math.random() * 9999999)
            let GameEmbed = new MessageEmbed({
                image: {
                    url: `attachment://${nomeALE}.png`
                },
                files: [{
                    attachment: canvas, 
                    name: `${nomeALE}.png`
                }]
            })
            .setColor("RANDOM")
            .setTitle(t("commands:tictactoe.currentPlayer", {
                user: this.participantes[this.vez].tag
            }))
            .setFooter(t('commands:tictactoe.sendNumber'))
            .setDescription(`:o: **${this.participantes[0].tag}**\n:x: **${this.participantes[1].tag}**`)
            message.delete()
            await channel.send(GameEmbed).then(cc => {
                this.createCollector(cc, cc.channel,t)
            })
        
            
        }
    }
    async createCollector (cc, channel, t) {
        let filter = (ur) => ur.author.bot === false
        const collector = await channel.createMessageCollector(filter);
        collector.on("collect", async (msg) => {
            if (isNaN(msg.content)) return;
            if (msg.author.id === this.participantes[this.vez].id) {
                msg.delete()
                
                let cordinate = this.getCordinate(msg.content)
                
                if (this.isEmpty(this.game, cordinate)) {
                    collector.stop()
                    this.game[cordinate[0]][cordinate[1]] = this.participantes[this.vez].id === this.emotes['1'] ? 0 : 1;
                    this.vez = this.vez === 0 ? 1 : 0
                    let winner = this.getWinner()
                    this.jogada += 1;
                    await this.updateEmbed(cc, channel, t, winner)

                } else {
                    channel.send(t('commands:tictactoe.isEmpty'))
                }
            }
        })
    }
    async react (cc) {
        for (let i=0; i<9;i++) {
            await cc.react(this.numeros[i])
        }
    }
    getWinner (gameState) {
        for (const conditionCoordinates of this.winConditions) {
          const spaceValues = this.getSpaceValues(gameState, conditionCoordinates)
          if (spaceValues.every((value, index, array) => value === array[0]) && spaceValues[0] !== null) {
            return spaceValues[0]
          }
        }
      }
    
      getSpaceValues (gameState, coordinateArray) {
        return coordinateArray.map(coordinate => {
          return this.game[coordinate[0]][coordinate[1]]
        })
      }
    isEmpty (gameState, cordinate) {
        return this.game[Number(cordinate[0])][Number(cordinate[1])] === null ? true : false
    }
    getCordinate (emoji) {

        switch (emoji) {
        case "1":
            return [0,0]
                
                break;
        case '2':
                
            return [0,1]
            
                break;
        case '3':
                
            return [0,2]
            
                break;
        case '4':
                
            return [1,0]
            
                break;
        case '5':
                
            return [1,1]
            
                break;
        case '6':
                
            return [1,2]
            
                break;
        case '7':
                
            return [2,0]
            
                break;
        case '8':
                
            return [2,1]
            
                break;
        case '9':
                
            return [2,2]
        
            default:
                return false
        
        }
    }
    async generateTictactoeImage (gameObj) {
        const Canvas = require('canvas')
        const canvas = Canvas.createCanvas(1536, 1536)
        const ctx = canvas.getContext("2d")
        ctx.fillStyle = "white"
        ctx.fillRect(512, 0, 20, 1536)
        ctx.fillRect(1024, 0, 20, 1536)
        ctx.fillRect(0, 512, 1536, 20)
        ctx.fillRect(0, 1024, 1536, 20)
        ctx.font = "400px Arial Black"
        ctx.textAlign= "center"
        ctx.globalAlpha = 0.05;
        
        
        ([0,1].includes(gameObj[0][0])) ? null : (ctx.fillText("1", 256, 400));
        ([0,1].includes(gameObj[0][1])) ? null : ctx.fillText("2", 768, 400);
        ([0,1].includes(gameObj[0][2])) ? null : ctx.fillText("3", 1280, 400);
    
        ([0,1].includes(gameObj[1][0])) ? null : ctx.fillText("4", 256, 925);
        ([0,1].includes(gameObj[1][1])) ? null : ctx.fillText("5", 768, 925);
        ([0,1].includes(gameObj[1][2])) ? null : ctx.fillText("6", 1280, 925);

        ([0,1].includes(gameObj[2][0])) ? null : ctx.fillText("7", 256, 1425);
        ([0,1].includes(gameObj[2][1])) ? null : ctx.fillText("8", 768, 1425);
        ([0,1].includes(gameObj[2][2])) ? null : ctx.fillText("9", 1280, 1425);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ff2b2b';
        ([0,1].includes(gameObj[0][0])) ? ctx.fillText(gameObj[0][0] === 0 ? "O" : "X", 256, 400) : null;
        ([0,1].includes(gameObj[0][1])) ? ctx.fillText(gameObj[0][1] === 0 ? "O" : "X", 768, 400) : null;
        ([0,1].includes(gameObj[0][2])) ? ctx.fillText(gameObj[0][2] === 0 ? "O" : "X", 1280, 400) : null;
    
        ([0,1].includes(gameObj[1][0])) ? ctx.fillText(gameObj[1][0] === 0 ? "O" : "X", 256, 925) : null;
        ([0,1].includes(gameObj[1][1])) ? ctx.fillText(gameObj[1][1] === 0 ? "O" : "X", 768, 925) : null;
        ([0,1].includes(gameObj[1][2])) ? ctx.fillText(gameObj[1][2] === 0 ? "O" : "X", 1280, 925) : null;

        ([0,1].includes(gameObj[2][0])) ? ctx.fillText(gameObj[2][0] === 0 ? "O" : "X", 256, 1425) : null;
        ([0,1].includes(gameObj[2][1])) ? ctx.fillText(gameObj[2][1] === 0 ? "O" : "X", 768, 1425) : null;
        ([0,1].includes(gameObj[2][2])) ? ctx.fillText(gameObj[2][2] === 0 ? "O" : "X", 1280, 1425) : null;
        return canvas.toBuffer()
    }
}
module.exports = TicTacToeGame