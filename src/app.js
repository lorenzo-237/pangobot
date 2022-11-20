const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const { discordToken } = require('./config/config.json');

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
	presence: { activities: [{ type: ActivityType.Watching, name: 'aquaticra', url: 'www.twitch.tv/aquaticra' }], status: 'online' },
});

client.commands = new Collection();

const commandsMainDirectory = path.join(__dirname, 'commands');
const commandsSubDirectories = fs.readdirSync(commandsMainDirectory, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());

commandsSubDirectories.map((directory) => {
	const commandsSubDirectory = path.join(commandsMainDirectory, directory.name);
	const commandsFiles = fs.readdirSync(commandsSubDirectory).filter((file) => file.endsWith('.js'));

	commandsFiles.map((file) => {
		const commandFilePath = path.join(commandsSubDirectory, file);
		const command = require(commandFilePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	});
});

const eventsDirectory = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsDirectory).filter((file) => file.endsWith('.js'));

eventFiles.map((file) => {
	const eventFilePath = path.join(eventsDirectory, file);
	const event = require(eventFilePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
});

client.login(discordToken);
