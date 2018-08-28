const { prefix } = require('../config.json');
module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    execute(message, args) {
        const data = [];
		const { commands } = message.client;

		if (!args.length) {
		    data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => prefix + command.name + ":\n\t" + command.description).join('\n'));
			message.channel.send(data);
		}
    },
};