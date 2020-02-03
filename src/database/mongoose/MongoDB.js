const mongoose = require('mongoose');

require('dotenv').config();

const Wrapper = require('../Wrapper');
const { User, Bot, Guild} = require('./schemas');

module.exports = class MongoDB extends Wrapper {
    constructor(options = {}) {
        super(options);
        this.mongoose = mongoose
    };

    async startConnection() {
        return mongoose.connect(process.env.mongoose_uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((m) => {
            this.users = m.model('Users', User);
            this.me = m.model("Me", Bot);
            this.guilds = m.model("Guilds", Guild)
        });
    };
};