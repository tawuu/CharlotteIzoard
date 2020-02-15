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
            this.downloadLocalesFromGithub()
            return true
        } catch (err) {
            console.error(err)
        }
    }

    downloadLocalesFromGithub() {
        try {

            for (let language of this.languages) {
                for (let ns of this.ns) {
                    fs.promises.mkdir(`src/locales/${language}`, { recursive: true }).then(() => {

                        const file = createWriteStream(`src/locales/${language}/${ns}.json`);
                        const request = http.get(`https://raw.githubusercontent.com/ItzNerd/CharlotteLocales/master/pt-BR/${ns}.json`, function(response) {
                            response.pipe(file);
                        });
                    })
                }
            }
        } catch (err) {
            console.error(err)
        } finally {
            this.initializeLocales()
            console.log(chalk.green("Locales are downloaded sucessfully"))
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