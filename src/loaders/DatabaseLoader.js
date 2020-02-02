const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const chalk = require('chalk');
const database = require('../database/index');

module.exports = class DatabaseLoader  {
    constructor(client) {
        this.client = client;

    }

    load () {
        try {
            console.log(chalk.green("Database are initializing"))
            this.initializeDatabase()
            return true
        } catch (err) {
            console.error(err)
        }
    }

    initializeDatabase () {
        this.client.database = database;
    }

}