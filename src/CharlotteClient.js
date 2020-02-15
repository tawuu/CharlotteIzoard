const { Client } = require('discord.js');

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
        const Loaders = require('./loaders');
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