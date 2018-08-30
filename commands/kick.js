module.exports = {
    name: 'kick',
    description: 'yikes',
    execute(message, args) {
		const command = require('./thisissosad.js');
		const taggedUser = message.mentions.users.first();
		if(taggedUser.username === "Sunny")
			command.execute(message, []);	// empty arguments defaults to "Despacito 2"
		else if(taggedUser.username === "sokasuki")
			command.execute(message, ["The","Sweet", "Sound", "Of", "Victory"]);
    },
};