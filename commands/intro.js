const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "intro",
  description: "Displays the bot introduction.",
  execute(message, args) {
    const introEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("BikkitBot")
      .setDescription(
        "Bot designed for Bikkit's server. Handles odd and end minor functions."
      )
      .addFields(
        { name: "!intro", value: "Posts this embedded message.", inline: true },
        {
          name: "!commands",
          value: "Displays a quick and simple list of commands",
          inline: true,
        },
        {
          name: "!help",
          value: "Pings Igi and also sends a message requesting help.",
          inline: true,
        },
        {
          name: "!resources <game>",
          value: "Links to user defined resources used for the specified game.",
          inline: true,
        },
        {
          name: "!randomize <s,m,l> <1-4>",
          value: "Randomizes Phasmophobia map and difficult",
          inline: true,
        },
        {
          name: "And more...",
          value:
            "View all commands at <https://github.com/williammabernathy/bikkitbot/tree/main/commands>",
          inline: true,
        }
      )
      .setFooter({
        text: "Full details at: <https://github.com/williammabernathy/bikkitbot>",
      });

      message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send({ embeds: [introEmbed] });
  },
};
