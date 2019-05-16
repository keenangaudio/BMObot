module.exports = {
    name: 'randomproverb',
    description: 'You know what they say...',
    execute(message, args) {
    	var proverbs = new Array(
    		"BLOOD ALONE MOVES THE WHEELS OF HISTORY", 
    		"Coconuts are technically mammals because they have hair and produce milk."
    		);
    	var res = Math.random()*proverbs.length;

		message.channel.send(proverbs[parseInt(res)]);
    },
};