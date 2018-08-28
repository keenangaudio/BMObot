var request = require("request");
const Discord = require('discord.js');
module.exports = {
    name: 'reddit',
    description: 'Parses reddit!',
    execute(message, args) {
    	function fetchReddit(error, response, body, args){
			if (!error && response.statusCode === 200) {
				body = body.data.children;

				if(body.length == 0){
			    	return message.channel.send(new Discord.RichEmbed()
				    .setColor('RED')
				    .setTitle('Nothing was found in r/'+args[0])
				    .setURL("https://www.reddit.com/r/"+args[0]+"/top")
				    .setTimestamp()
    				.setFooter('Powered by Reddit', 'https://i.imgur.com/sdO8tAw.png'));
			    }

				const embed = new Discord.RichEmbed()
			    .setColor('RED')
			    .setTitle('Top posts in '+args[0]+':')
			    .setURL("https://www.reddit.com/r/"+args[0]+"/top")
			    .setThumbnail('https://i.imgur.com/sdO8tAw.png')
			    .setTimestamp()
    			.setFooter('Powered by Reddit', 'https://i.imgur.com/sdO8tAw.png');

			    body.forEach(function(post) {
			    	var desc;
			    	if(post.data.selftext !== "" && post.data.selftext !== "&amp;#x200B;"){
			    		desc = post.data.selftext;
			    	}
			    	else{
			    		desc = post.data.url;
			    	}
			    	if(desc.length > 500){
			    		desc = desc.substring(0, 500) + "...";
			    	}
			    	var title = post.data.title;
			    	if(title.length>256){
			    		title = title.substring(0, 253) + "...";
			    	}
				    embed.addField(title, desc);
				});

			    return message.channel.send(embed);
			}
			else{
				console.log(error);
				return message.channel.send("Debug ur shit Sunny.");
			}
    	}

        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        else if(args.length == 1){
	        request({
				url: "https://www.reddit.com/r/"+args[0]+"/top/.json?limit=3",
				json: true
			}, (error, response, body) => {fetchReddit(error, response, body, args)});
    	}
    	else{
    		if(isNaN(args[1]) || args[1]<1 || args[1]>25){
    			return message.channel.send("Your second argument is not a valid number between 1-25!");
    		}
    		request({
				url: "https://www.reddit.com/r/"+args[0]+"/top/.json?limit="+args[1],
				json: true
			}, (error, response, body) => {fetchReddit(error, response, body, args)});
    	}
    },
};