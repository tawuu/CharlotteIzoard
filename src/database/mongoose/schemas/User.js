const { Schema } = require('mongoose');

const ban = {
    banned: {
        type: Boolean,
        default: false
    },
    reason: {
        type: String,
        default: ""
    }
}

module.exports = new Schema({
    _id: {
        type: String
    },
    ban: ban
});