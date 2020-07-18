var request = require("request");
const Discord = require('discord.js');
module.exports = {
    name: 'random',
    description: 'Just gives u something random idk',
    execute(message, args) {
    	function fetchReddit(error, response, body, args){
			if (!error && response.statusCode === 200) {
				post = body.data.children[0].data;

				const embed = new Discord.MessageEmbed()
			    .setColor('RED')
			    .setTitle(post.title+':')
			    .setURL("https://www.reddit.com/"+post.permalink)
			    .setTimestamp()

			    if(post.is_self){
			    	embed.setDescription(post.selftext)
			    }
			    else{
			    	embed.setImage(post.url)
			    }

			    return message.channel.send(embed);
			}
			else{
				console.log(error);
				return message.channel.send("Debug ur shit Sunny.");
			}
    	}

        request({
			url: "https://www.reddit.com/r/random/.json?limit=1",
			json: true
		}, (error, response, body) => {fetchReddit(error, response, body, args)});
    },
};