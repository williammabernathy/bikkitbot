const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Sends a help request.'),
  async execute(channel, args) {
    await channel.send(`Help us <@164903491972759552>, you\'re our only hope.. (A message has also been sent) \n` +
    'Familiar with node.js, or discord bots in general? Consider putting in a ticket here: <https://github.com/williammabernathy/bikkitbot/issues> \n' +
    'Is this part of a correction or update? Submit the pull request here: <https://github.com/williammabernathy/bikkitbot/pulls>');
  },
};