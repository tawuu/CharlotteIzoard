module.exports = class CommandContext {
    constructor(client, options) {
        this.client = client;
        this.guild = options.guild ? options.guild : null;
        this.prefix = options.prefix;
        this.channel = options.channel;
        this.member = options.guild ? options.member : null;
        this.author = options.author;
        this.t = options.t;
        this.me = options.guild ? options.guild.members.get(this.client.user.id) : null;
        this.user = options.user;
        this.reply = async (text, ...files) => {
            let msg;
            if (text instanceof Object) {
                msg = await client.createMessage(options.channel.id, text, ...files)
            } else {
                msg = await client.createMessage(options.channel.id, `**${options.author.username}**, ${text}`);
            }
            return msg
        }
        this.dbBot = options.bot;
        this.dbGuild = options.guildDB;
        this.getUserAt = function (arg, guildOnly) {
            let args = options.content.slice(options.prefix.lenght).trim().split(/ +/g).slice(1)
            if (args[arg]){
                let user = guildOnly ? options.guild.members.get(args[arg].replace(/[<>!@]/g, '')) : client.users.get(args[arg].replace(/[<>!@]/g, ''));
                if (user)
                    return user
                else
                    return null
            }else
                return null
        }
    }
}