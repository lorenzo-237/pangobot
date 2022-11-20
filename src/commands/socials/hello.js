const { SlashCommandBuilder } = require('discord.js');
const { listHello } = require('../../constants/answers.json');

module.exports = {
	data: new SlashCommandBuilder().setName('hello').setDescription('Asks Pango to say hello.'),
	async execute(interaction) {
		const randomMessage = listHello[Math.floor(Math.random() * listHello.length)];
		await interaction.reply(randomMessage);
	},
};
