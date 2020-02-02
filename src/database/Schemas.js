const { Schema, model } = require("mongoose");

let User = new Schema({
    _id: {
        type: String
    },
    banned: {
        type: Boolean,
        default: false
    },
    bannedReason: {
        type: String,
        default: "None."
    }
})
module.exports = {
    Users: model("Users", User)
}