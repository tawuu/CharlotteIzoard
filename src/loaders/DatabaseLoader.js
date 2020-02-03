const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const chalk = require('chalk');
const { MongoDB } = require('../database');

module.exports = class DatabaseLoader  {
    constructor(client) {
        this.client = client;

    }

    load () {
        try {
            console.log(chalk.green("Database are initializing"));
            this.initializeDatabase(MongoDB);
            return true
        } catch (err) {
            console.error(err)
        }
    }

    initializeDatabase (DBWrapper, options = {}) {
        this.client.database = new DBWrapper(options);
        this.client.database.startConnection()
            .then(() => console.log('Connection was made to the database!'))
            .catch(e => {
                console.log(e.message);
                this.client.database = null
            });
    }

}