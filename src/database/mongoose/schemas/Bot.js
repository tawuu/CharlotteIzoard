const { Schema } = require('mongoose');

const staffers = {
    owners: [],
    administrator: []
}
const commands = [
    {
        _id: String,
        maintenance: {
            type: Boolean,
            default: false
        },
        maintenanceReason: {
            type: String,
            default: "None."
        },
        uses: {
            type: Number,
            default: 0
        }
    }
]
module.exports = new Schema({
    _id: {
        type: String
    },
    staffers: staffers,
    commands
});

