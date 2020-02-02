module.exports = class CommandContext {
    constructor(client, options) {
        this.client = client;
        this.message = options.message;
        this.guild = options.message.guild ? options.message.guild : null;
        this.prefix = options.prefix;
        this.channel = options.message.channel;
        this.member = options.message.guild ? options.message.member : null;
        this.voice = options.message.guild ? options.message.member.voice : null;
        this.author = options.message.author;
        this.t = options.t
        this.me = options.message.guild ? options.message.guild.members.get(this.client.user.id) : null
        
        this.reply = (text, opt) => options.message.channel.send(`**${options.message.author.username}**, ${text}`, opt)
        this.getUserAt = function (arg, guildOnly) {
            
            let args = options.message.content.slice(options.prefix.lenght).trim().split(/ +/g).slice(1)
            if (args[arg]){
                let user = guildOnly ? options.message.guild.members.get(args[arg].replace(/[<>!@]/g, '')) : client.users.fetch(args[arg].replace(/[<>!@]/g, ''));
                if (user) 
                    return user
                else 
                    return null
            }else 
                return null
        }
    }
}