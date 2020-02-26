const {Collection} = require("eris");
const {readdirSync} = require("fs");
const chalk = require("chalk");

module.exports = class EventLoader {
	constructor(client) {
		this.client = client;
		this.reloadCommand = this.reloadCommand.bind(this);
		this.client.reloadCommand = this.reloadCommand;
	}

	load() {
		try {
			console.log(chalk.green("Commands are initializing"));
			this.initializeCommands();
			return true;
		} catch (err) {
			console.error(err);
		}
	}

	async reloadCommand(commandName) {
		let comando =
			this.client.commands.get(commandName) ||
			this.client.commands.get(this.client.alias.get(commandName));

		if (comando) {
			let dir = comando.dir;
			this.client.commands.delete(comando.name);
			delete require.cache[require.resolve(`../${dir}`)];
			let props = new (require(`../${dir}`))(this.client);
			props.dir = dir;
			await this.client.commands.set(props.name, props);
			return true;
		} else {
			if (commandName === "all") {
				this.client.commands.forEach(a => {
					delete require.cache[require.resolve(`../${a.dir}`)];
				});
				this.client.commands = null;
				this.client.alias = null;
				this.initializeCommands();
			}
			return null;
		}
	}

	async initializeCommands() {
		this.client.commands = new Collection();
		this.client.alias = new Collection();
		let commandsCategory = readdirSync("src/commands");
		for (let category of commandsCategory) {
			let commandFile = readdirSync(`src/commands/${category}`);
			for (let name of commandFile) {
				const command = new (require("../commands/" +
					category +
					"/" +
					name.split(".js")[0]))(this.client);
				this.client.commands.set(command.name, command);
				command.alias.forEach(a =>
					this.client.alias.set(a, command.name)
				);
				command.dir = `commands/${category}/${name}`;
			}
		}
	}
};
