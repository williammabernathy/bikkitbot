const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("intro")
    .setDescription("Displays the bot introduction."),
  async execute(channel, args) {
    const introEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("BikkitBot")
      .setDescription("Bot designed for Bikkit's server. Handles odd and end minor functions.")
      .addFields(
        { name: '!intro', value: 'Posts this embedded message.', inline: true },
        { name: '!commands', value: 'Displays a quick and simple list of commands', inline: true },
        { name: '!help', value: 'Pings Igi and also sends a message requesting help.', inline: true },
        { name: '!resources <game>', value: 'Links to user defined resources used for the specified game.', inline: true },
        { name: '!randomize <TO DO>', value: 'TO DO', inline: true },
        { name: 'And more...', value: 'View all commands at <https://github.com/williammabernathy/bikkitbot/tree/main/commands>', inline: true },
      )
      .setFooter({ text: 'Full details at: <https://github.com/williammabernathy/bikkitbot>' });

      await channel.send({ embeds: [introEmbed] });
  },
};
