const { Schema } = require('mongoose');

let guildSettings = {
    lang: {
        type: String,
        default: "pt-BR"
    },
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