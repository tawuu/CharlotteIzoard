const {Client:ErisClient} = require("eris");
const Loaders = require("./loaders")

module.exports = class Client extends ErisClient {
    constructor(token, options = {}) {
        super(token, options)

        this.utils = require("./utils")

        this.initializeLoaders()
    }
    connect() {
        super.connect()
        return this;
    }
    logError(err) {
        return console.error(err)
    }
    async initializeLoaders () {
        try {
            for (let name in Loaders) {
                const Loader = new Loaders[name](this)
                await Loader.load()
            }
        } catch(err) {
            this.logError(err)
        }
    }
}