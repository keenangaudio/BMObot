var request = require("request");
module.exports = {
    name: 'xkcd',
    description: 'Returns a random xkcd comic.',
    execute(message, args) {
    	var maxComic = 1;

        request({
			url: "https://xkcd.com/info.0.json",
			json: true
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				maxComic = body.num;
				var random = Math.floor((Math.random() * maxComic) + 1);
				//console.log(maxComic);

				request({
					url: "https://xkcd.com/"+random+"/info.0.json",
					json: true
				}, function (error, response, body) {
					if (!error && response.statusCode === 200) {
						var resp = body.safe_title + "\n*" + body.alt + "*";
						message.channel.send(resp, {
						    file: body.img
						});
					}
					else{
						message.channel.send("Debug ur shit Sunny.");
						console.log(error);
					}
				});
			}
			else{
				message.channel.send("Debug ur shit Sunny.");
				console.log(error);
			}
		});

    },
};