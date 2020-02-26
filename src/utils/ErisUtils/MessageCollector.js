const { EventEmitter } = require("events")

module.exports = class MessageCollector extends EventEmitter {
    constructor(channel, filter, options = {}) {
        super();

        this.channel = channel;
        this.filter = filter;
        this.client = channel.guild.shard.client || channel._client
        this.verify = this.verify.bind(this)
        this.collectedSize = 0;
        this.isEnded = false
        this.options = {
            max: options.max || 5,
            time: options.time || 30000
        }
        this.initializeListeners()
    }
    initializeListeners() {
        setTimeout(() => this.stopListeners("timeEnded"), this.options.time)
        this.client.on("messageCreate", this.verify)
    }
    stopListeners(reason = null) {
        if (this.isEnded) return;
        this.client.removeListener("messageCreate", this.verify)
        this.isEnded = true
        return this.emit("end", reason)
    }
    verify(message) {
        if (this.channel.id !== message.channel.id) return null;
        if (this.filter(message)) {
            if (message.author.bot) return;
            this.collectedSize += 1
            if (this.collectedSize >= this.options.max) return this.stopListeners("maxMessages")
            this.emit("collect", message);
            return true;
        }
        return null;
    }
}