const CommandHandler = require('../../structures/command/CommandHandler');
const { GoogleTranslateAPI } = require("../../utils")

module.exports = class TranslateCommand extends CommandHandler {
    constructor(client) {
        super(client, {
            name: 'translate',
            alias: ['traduzir'],
            category: "utils",
            requirements: {}
        })
    }
    async execute({ t, reply }, args) {
        if (!args[0]) return reply(t("commands:translate.missingLanguage"))
        if (!args[1]) return reply(t("commands:translate.missingMessage"))

        GoogleTranslateAPI(args.slice(1).join(" "), args[0]).then(a => reply(a.text)).catch(err => {
            reply(t("commands:translate.error"))
        })
    }
}