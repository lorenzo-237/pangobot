const fs = require('fs');
const configFile = './src/config/config.json';

const updateTwitchToken = (token) => {
	fs.readFile(configFile, 'utf8', (err, data) => {
		if (err) {
			console.log(err);
		} else {
			config = JSON.parse(data); // now it's an object
			config.twitchToken = token;
			json = JSON.stringify(config); //convert it back to json
			fs.writeFile(configFile, json, 'utf8', (err) => {
				if (err) {
					return console.log(err);
				}
				console.log('New token updated');
			}); // write it back
		}
	});
};

const getTwitchToken = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(configFile, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				config = JSON.parse(data); //now it an object
				resolve(config.twitchToken);
			}
		});
	});
};

module.exports = { updateTwitchToken, getTwitchToken };
