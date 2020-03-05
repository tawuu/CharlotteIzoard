const { Schema } = require('mongoose');

let guildSettings = {
    lang: {
        type: String,
        default: "pt-BR"
    },
    prefix: {
        type: String,
    },
    unavailableCommand: {
        type: Boolean,
        default: false
    }
}
module.exports = new Schema({
    _id: {
        type: String
    },
    settings: guildSettings,
    mutedUsers: {
        type: Map,
        default: new Map()
    }
});