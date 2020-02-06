module.exports = class EventHandler {
    constructor(client, name) {
        this.client = client
        this.name = name
        this.dir = null;
    }
    getLocaleLanguage(lang) {
        return {
            'brazil': 'pt-BR',
            'singapore': 'en-US',
            'eu-central': 'en-US',
            'eu-west': 'en-US',
            'hongkong': 'en-US',
            'southafrica': 'en-US',
            'us-central': 'en-US',
            'japan': 'en-US',
            'us-east': 'en-US',
            'russia': 'en-US',
            'us-west': 'en-US',
            'sydney': 'en-US',
            'us-south': 'en-US',
        }[lang]
    }
}