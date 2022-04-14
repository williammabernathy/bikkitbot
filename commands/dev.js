const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dev')
    .setDescription('various dev commands for those with permissions'),
  async execute(channel, args) {
    await channel.send('Dev commands (expect not yet)');
  },
};