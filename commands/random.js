var request = require("request");
const Discord = require('discord.js');
module.exports = {
    name: 'random',
    description: 'Just gives u something random idk',
    execute(message, args) {
    	function fetchReddit(error, response, body, args){
			if (!error && response.statusCode === 200) {
				if(body.data.children.length == 0 && args.length == 1){
					return message.channel.send(args[0] + "? Can't find it dude.")
				}

				post = body.data.children[0].data;

				const embed = new Discord.RichEmbed()
			    .setColor('RED')
			    .setTitle(post.title+':')
			    .setURL("https://www.reddit.com"+post.permalink)
			    .setTimestamp()
			    .setFooter("From "+post.subreddit_name_prefixed)

			    if(post.is_self){
			    	desc = post.selftext
			    	if(desc.length >= 2048){
			    		desc = desc.substring(0, 2045) + "...";
			    	}
			    	embed.setDescription(desc)
			    }
			    else{
			    	if(post.url.includes("youtube")){
			    		embed.setDescription(post.url)
			    	}
			    	else{
			    		embed.setImage(post.url)
			    	}
			    }

			    return message.channel.send(embed);
			}
			else{
				console.log(error);
				return message.channel.send("Debug ur shit Sunny.");
			}
    	}

    	if (!args.length) {
            request({
				url: "https://www.reddit.com/r/random/.json?limit=1",
				json: true
			}, (error, response, body) => {
				console.log("https://www.reddit.com/r/"body.data.children[0].data.subreddit_name_prefixed"/random/.json?limit=1");
				request({
					url: "https://www.reddit.com/r/"body.data.children[0].data.subreddit_name_prefixed"/random/.json?limit=1",
					json: true
				}, (error, response, body) => {
					fetchReddit(error, response, body, args)
				});
			});
        }
        else if(args.length == 1){
        	console.log("https://www.reddit.com/r/"+args[0]+"/random/.json?limit=1");
	        request({
				url: "https://www.reddit.com/r/"+args[0]+"/random/.json?limit=1",
				json: true
			}, (error, response, body) => {fetchReddit(error, response, body, args)});
    	}
    },
};