const { Client } = require('discord.js');
const Loaders = require('./loaders');

module.exports = class CharlotteClient extends Client {
    constructor(options = {}) {
        super(options);
        this.initializeLoaders()
    }
    login (token) {
        super.login(token);
        return this;
    }

    initializeLoaders () {
        for (let name in Loaders) {
            try {
                let Loader = new Loaders[name](this);
                Loader.load()
            } catch(err) {
                console.error(err)
            }
        }
    }
}