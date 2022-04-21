const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); // build the bot client
client.commands = new Collection();
const botCommands = require("./commands"); // get and require our command folder

// map all commands inside ./commands directory
Object.keys(botCommands).map((key) => {
  client.commands.set(botCommands[key].name, botCommands[key]);
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", (message) => {
  if (message.content[0] !== prefix) return;

  const args = message.content.split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command.substring(1))) return;

  // const commandParsed = client.commands.get(command.substring(1));
  // const channel = client.channels.cache.find(c => c.name === `bot-spam`);

  try {
    //commandParsed.execute(channel, args);
    client.commands.get(command.substring(1)).execute(message, args);
  } catch (error) {
    console.error(error);
	message.reply("Oops! Something went wrong trying to execute that command.");
  }
});

client.login(token);
