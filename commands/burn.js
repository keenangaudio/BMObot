module.exports = {
    name: 'burn',
    description: 'some helpful resources for when someone gets burned',
    execute(message, args) {
    	var links = new Array(
    		"http://www.redonkulas.com/wp-content/uploads/2013/03/DA-FORM-IMTWF1.pdf", 
    		"https://en.wikipedia.org/wiki/List_of_burn_centres_in_Canada", 
    		"https://www.webmd.com/first-aid/thermal-heat-or-fire-burns-treatment"
    		);
    	var res = Math.random()*links.length;

		message.channel.send(links[parseInt(res)]);
    },
};