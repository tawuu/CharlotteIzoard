const {Collection} = require("eris");
const {readdirSync} = require("fs");
const chalk = require("chalk");

module.exports = class EventLoader {
	constructor(client) {
		this.client = client;
	}

	load() {
		try {
			console.log(chalk.green("Events are initializing"));
			this.initializeEvents();
			return true;
		} catch (err) {
			console.error(err);
		}
	}

	initializeEvents() {
		this.client.events = new Collection();
		let eventsFiles = readdirSync("src/events");
		for (let file of eventsFiles) {
			const event = new (require("../events/" + file))(this.client);
			event.dir = `/events/${file}`;
			this.client.events.set(event.name, event);
		}
		this.addListener();
	}
	addListener() {
		this.client.events.forEach(event => {
			this.client.on(event.name, (...args) => event.run(...args));
		});
	}
};
