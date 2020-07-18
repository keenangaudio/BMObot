var request = require("request");
const Discord = require('discord.js');
module.exports = {
    name: 'random',
    description: 'Just gives u something random idk',
    execute(message, args) {
    	function fetchReddit(error, response, body, args){
			if (!error && response.statusCode === 200) {

				try{
					if (body instanceof Array){
						post = body[0].data.children[0].data;
					}
					else{
						post = body.data.children[0].data;
					}
				}
				catch(error){
					message.channel.send("Debug ur shit Sunny.")
				}

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
			    	if(post.post_hint.includes("image") || post.url.includes(".gif")){
			    		embed.setImage(post.url)
			    	}
			    	else{
			    		embed.setDescription(post.url)
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
				console.log("hittin https://www.reddit.com/"+body.data.children[0].data.subreddit_name_prefixed+"/random/.json?limit=1");
				request({
					url: "https://www.reddit.com/"+body.data.children[0].data.subreddit_name_prefixed+"/random/.json?limit=1",
					json: true
				}, (error, response, body) => {
					//console.log(body);
					fetchReddit(error, response, body, args)
				});
			});
        }
        else if(args.length == 1){
        	console.log("hittin https://www.reddit.com/r/"+args[0]+"/random/.json?limit=1");
	        request({
				url: "https://www.reddit.com/r/"+args[0]+"/random/.json?limit=1",
				json: true
			}, (error, response, body) => {fetchReddit(error, response, body, args)});
    	}
    },
};