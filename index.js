const Discord = require('discord.js');
//const config = require('./config.json');
const config = require('./config.json');
const client = new Discord.Client();

var request = require("request")
var unirest = require('unirest');

client.on('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	if (!message.content.startsWith(config.prefix) && message.attachments.size == 0) return;

	/*	FIX WITH A NOT BROKEN API LATER
	if(message.attachments.size > 0){
		console.log("Found an image?");
        var image = message.attachments.first();
        if(true){//image.url.endsWith("png") || image.url.endsWith("jpg")){
            unirest.get("https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=glass%2Cgender%2Cage%2Crace%2Csmiling&url="+image.url)
			.header("X-Mashape-Key", config.imageToken)
			.header("Accept", "application/json")
			.end(function (result) {
			  console.log(result.status, result.headers, result.body);
			  if (result.status === 200) {
			  	var json = result.body;
			  	if(json.face.length == 0) return;

			  	json = json.face[0].attribute;
			  	var resp = "Looks like a " + json.age.value + " old " + json.race.value + " " + json.gender.value + ".";
			  	return message.channel.send(resp);
			  }
			});
        }
    }*/

	const args = message.content.slice(config.prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if(command === "ping"){
		return message.channel.send('Pong.');
	}
	else if(command === "bibletime"){
		request({
			url: "https://beta.ourmanna.com/api/v1/get/?format=json&order=random",
			json: true
		}, function (error, response, body) {

			if (!error && response.statusCode === 200) {
				var verse = "*" + body.verse.details.text + "* - " + body.verse.details.reference;
				return message.channel.send(verse);
			}
			else{
				console.log(error);
			}
		})
	}
});

client.login(config.token);