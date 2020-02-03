const { Schema } = require('mongoose');

const staffers = {
    owners: [],
    administrator: []
}

module.exports = new Schema({
    _id: {
        type: String
    },
    staffers: staffers
});