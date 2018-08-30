var request = require("request");
module.exports = {
    name: 'getcoords',
    description: 'Gets the coordinates of an address.',
    execute(message, args) {
    	if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        request({
			url: "https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURI(args.join(" "))+"&sensor=false",
			json: true
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				body = body.results[0];
				if(!body)
					return message.channel.send("Location could not be reached!");
				var resp = body.formatted_address + " is at:\n(" + body.geometry.location.lat + ", " + body.geometry.location.lng + ")";
				message.channel.send(resp);
			}
			else{
				message.channel.send("Debug ur shit Sunny.");
				console.log(error);
			}
		});

    },
};