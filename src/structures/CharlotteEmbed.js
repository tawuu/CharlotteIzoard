const { MessageEmbed } = require("discord.js")

module.exports = class CharlotteEmbed extends MessageEmbed {
    constructor(data) {
        super(data);
        this.setColor("#3c92e8")
    }
}