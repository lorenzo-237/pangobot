const { twitchClient, twitchSecret } = require('../config/config.json');
const axios = require('axios');
const { updateTwitchToken, getTwitchToken } = require('./configService');

const refreshToken = () => {
	const options = {
		method: 'POST',
		url: `https://id.twitch.tv/oauth2/token?client_id=${twitchClient}&client_secret=${twitchSecret}&grant_type=client_credentials`,
	};
	return axios(options)
		.then(function (response) {
			updateTwitchToken(response.data.access_token);
		})
		.catch(function (error) {
			console.log(error);
		});
};

const listStreams = async (first, language, callback) => {
	const twitchToken = await getTwitchToken();
	if (!first) first = 3;
	const options = {
		method: 'GET',
		url: `https://api.twitch.tv/helix/streams?first=${first}`,
		headers: {
			'client-id': twitchClient,
			Authorization: 'Bearer ' + twitchToken,
		},
	};
	if (language !== '') {
		options.url += `&language=${language}`;
	}
	return axios(options)
		.then(function (response) {
			callback(response.data.data);
		})
		.catch(function (error) {
			console.log(error);
		});
};

const getStreamByUsername = async (username) => {
	const twitchToken = await getTwitchToken();
	const options = {
		method: 'get',
		url: `https://api.twitch.tv/helix/streams?user_login=${username}`,
		headers: {
			'client-id': twitchClient,
			Authorization: 'Bearer ' + twitchToken,
		},
	};

	const stream = await axios(options)
		.then(function (response) {
			return response.data.data[0];
		})
		.catch(function (error) {
			console.log(error);
		});
	return stream;
};

const getUserById = async (id) => {
	const twitchToken = await getTwitchToken();
	const options = {
		method: 'GET',
		url: `https://api.twitch.tv/helix/users?id=${id}`,
		headers: {
			'client-id': twitchClient,
			Authorization: 'Bearer ' + twitchToken,
		},
	};
	const user = await axios(options)
		.then(function (response) {
			return response.data.data[0];
		})
		.catch(function (error) {
			console.log(error);
		});
	return user;
};

const getGameById = async (id) => {
	const twitchToken = await getTwitchToken();
	const options = {
		method: 'GET',
		url: `https://api.twitch.tv/helix/games?id=${id}`,
		headers: {
			'client-id': twitchClient,
			Authorization: 'Bearer ' + twitchToken,
		},
	};
	const game = await axios(options)
		.then(function (response) {
			return response.data.data[0];
		})
		.catch(function (error) {
			console.log(error);
		});
	return game;
};

module.exports = { listStreams, getUserById, getGameById, getStreamByUsername, refreshToken };
