const { readdirSync, createWriteStream } = require('fs');
const fs = require('fs');
const http = require('https');
const chalk = require('chalk')
const i18next = require('i18next');
const translationBackend = require('i18next-node-fs-backend');

module.exports = class EventLoader  {
    constructor(client) {
        this.client = client
        this.languages = ["pt-BR", "en-US"]
        this.ns = ['commands', 'events', 'permissions', 'help']
    }


    load() {
        try {
            console.log(chalk.green("Locales are initializing"))
            this.initializeLocales()
            return true
        } catch (err) {
            console.error(err)
        }
    }


    async initializeLocales () {
        try {
            i18next.use(translationBackend).init({
                ns: this.ns,
                preload: await readdirSync('./src/locales/'),
                fallbackLng: 'pt-BR',
                backend: {
                    loadPath: `src/locales/{{lng}}/{{ns}}.json`
                },
                interpolation: {
                    escapeValue: false
                },
                returnEmptyString: false
            })

        } catch(err) {
            console.error(err)
        }
    }

}