var request = require("request");
module.exports = {
    name: 'bibletime',
    description: 'Recites a random bible verse!',
    execute(message, args) {
        request({
			url: "https://beta.ourmanna.com/api/v1/get/?format=json&order=random",
			json: true
		}, function (error, response, body) {

			if (!error && response.statusCode === 200) {
				var verse = "*" + body.verse.details.text + "* - " + body.verse.details.reference;
				return message.channel.send(verse);
			}
			else{
				message.channel.send("Debug ur shit Sunny.");
				console.log(error);
			}
		});
    },
};