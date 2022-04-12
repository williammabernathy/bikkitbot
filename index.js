const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', message => {
	if (message.content[0] !== prefix) return;
	
	// const ch = client.channels.cache.find(c => c.name === `bot-spam`);
	// console.log(ch);

	const args = message.content.split(/ +/);
  	const command = args.shift().toLowerCase();

	const commandParsed = client.commands.get(command.substring(1));
	const channel = client.channels.cache.find(c => c.name === `bot-spam`);

	try {
		commandParsed.execute(channel, args);
	} catch (error) {
		console.error(error);
	}
});


// client.on('interactionCreate', interaction => {
// 	if (!interaction.isCommand()) return;

// 	console.log(interaction);

// 	const command = client.commands.get(interaction.commandName);
// 	const channel = client.channels.cache.get('963181751751024660');

// 	if (!command) return;

// 	try {
// 		command.execute(interaction, channel);
// 	} catch (error) {
// 		console.error(error);
// 		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}
// });

client.login(token);