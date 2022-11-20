const { REST, Routes } = require('discord.js');
const { discordClient, discordToken, guildId } = require('./config/config.json');
const path = require('node:path');
const fs = require('node:fs');

const commands = [];

const commandsMainDirectory = path.join(__dirname, 'commands');
const commandsSubDirectories = fs.readdirSync(commandsMainDirectory, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());

commandsSubDirectories.map((directory) => {
	const commandsSubDirectory = path.join(commandsMainDirectory, directory.name);
	const commandsFiles = fs.readdirSync(commandsSubDirectory).filter((file) => file.endsWith('.js'));

	commandsFiles.map((fileName) => {
		const command = require(`./commands/${directory.name}/${fileName}`);
		commands.push(command.data.toJSON());
	});
});

const rest = new REST({ version: '10' }).setToken(discordToken);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(Routes.applicationGuildCommands(discordClient, guildId), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
