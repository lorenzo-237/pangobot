const { SlashCommandBuilder } = require('discord.js');
const { BuildStreamEmbed } = require('../../components/streamEmbed');
const { getStreamByUsername, getUserById } = require('../../services/twitchService');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stream')
		.setDescription('Gets information about active stream of the streamer')
		.addStringOption((option) => option.setName('streamer').setDescription('The streamer you would like to see').setRequired(true)),
	async execute(interaction) {
		const streamerName = interaction.options.getString('streamer');

		const stream = await getStreamByUsername(streamerName);
		const user = await getUserById(stream.user_id);

		await interaction.channel.send({ embeds: [BuildStreamEmbed({ stream, user })] });
		await interaction.reply({ content: 'Voici le stream ;)', ephemeral: true });
	},
};
