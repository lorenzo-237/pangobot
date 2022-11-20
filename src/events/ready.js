const { Events } = require('discord.js');
const schedule = require('node-schedule');
const { BuildStreamEmbed } = require('../components/streamEmbed');
const { refreshToken, getStreamByUsername, getUserById } = require('./../services/twitchService');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		client.aquaticraUp = false;
		console.log(`${client.user.tag} [ON]`);

		const everyWeek = '0 0 * * FRI'; // every friday at midnight
		const everyTwoMinutes = '*/2 * * * *';

		schedule.scheduleJob(everyWeek, () => {
			refreshToken();
		});

		schedule.scheduleJob(everyTwoMinutes, async () => {
			const stream = await getStreamByUsername('aquaticra');
			if (stream !== undefined) {
				// stream is up
				if (client.aquaticraUp == false) {
					client.aquaticraUp = true;
					const channel = await client.channels.cache.get('867457726090051585');
					channel.send(`C'est parti pour un nouveau stream, n'hésitez pas à passer ! @everyone`);

					const user = await getUserById(stream.user_id);
					channel.send({ embeds: [BuildStreamEmbed({ stream, user })] });
				}
			} else {
				client.aquaticraUp = false;
			}
		});
	},
};
