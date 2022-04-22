const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");
const { prefix, token } = require("./config.json");
const { Player } = require("discord-music-player");

global.queue = new Map();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] }); // build the bot client
client.commands = new Collection();
const botCommands = require("./commands"); // get and require our command folder

const player = new Player(client, {
    leaveOnEmpty: false, // This options are optional.
});
// You can define the Player as *client.player* to easily access it.
client.player = player;


// map all commands inside ./commands directory
Object.keys(botCommands).map((key) => {
  client.commands.set(botCommands[key].name, botCommands[key]);
});

client.once("ready", () => {
  console.log("Ready!");
});

// wait for a user to post a message
client.on("messageCreate", (message) => {
  if (message.content[0] !== prefix || !message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  const args = message.content.split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command.substring(1))) return;

  try {
    client.commands.get(command.substring(1)).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Oops! Something went wrong trying to execute that command.");
  }
});

client.login(token);
