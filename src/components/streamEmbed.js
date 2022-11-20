// at the top of your file
const { EmbedBuilder } = require('discord.js');

const BuildStreamThumbnail = (stream) => {
	const height = 200;
	const width = 400;
	let thumbnail = stream.thumbnail_url.replace('{width}', width);
	thumbnail = thumbnail.replace('{height}', height);
	return thumbnail;
};

const BuildStreamEmbed = ({ stream, user }) => {
	const streamURL = `https://www.twitch.tv/${user.login}`;
	return new EmbedBuilder()
		.setColor('DarkPurple')
		.setTitle(`[${stream.language.toUpperCase()}] ${stream.game_name} ~ ${stream.title}`)
		.setURL(streamURL)
		.setAuthor({ name: user.display_name, iconURL: user.profile_image_url, url: streamURL })
		.setDescription(user.description)
		.setImage(BuildStreamThumbnail(stream))
		.setFooter({ text: `Viewers : ${stream.viewer_count}` });
};

module.exports = { BuildStreamEmbed };
