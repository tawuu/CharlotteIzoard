module.exports = class CommandContext {
    constructor(client, options) {
        this.client = client;
        this.message = options.message;
        this.guild = options.message.guild;
        this.prefix = options.prefix;
        this.channel = options.message.channel;
        this.member = options.message.member;
        this.voice = options.message.member;
        this.author = options.message.author;
        this.t = options.t
        this.reply = (text, opt) => options.message.channel.send(`${options.message.author.username}, ${text}`, opt)

    }
}