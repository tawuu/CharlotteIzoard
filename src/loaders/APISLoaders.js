const { Collection } = require('discord.js');
const chalk = require('chalk')
const apis = require("../apis")

module.exports = class EventLoader  {
    constructor(client) {
        this.client = client;
    }

    load () {
        try {
            console.log(chalk.green("Apis are initializing"))
            this.initializeApis()
            return true
        } catch (err) {
            console.error(err)
        }
    }
    

    initializeApis() {
        this.client.apis = {}
        for (let api in apis) {
            this.client.apis[api] = apis[api]
        }
    }

}