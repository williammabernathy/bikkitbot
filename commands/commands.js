const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commands')
    .setDescription('Replies with Pong!'),
  async execute(channel, args) {
    await channel.send('List of currently supported commands: \n\n' +
      
    '**!intro**: displays the bot\'s introduction. \n' +
    '**!help**: pings Igifoshifo and lists a couple helpful options.\n' +
    '**!commands**: list a full, simple list of supported commands (what you\'re seeing now).\n' +
    '**!resources**: shows resources for a specified game.\n' +

    'Plus a few odd or hidden features!\n\n' + 

    '**Spoilers!** For a full list of commands visit: <https://github.com/williammabernathy/bikkitbot/tree/main/commands>');
  },
};