const { Schema } = require('mongoose');

const banSchema = new Schema({
    banned: {
        type: Boolean,
        default: false
    },
    reason: String
})

module.exports = new Schema({
    _id: {
        type: String
    },
    ban: banSchema
});