const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daddy")
    .setDescription("I mean, it's daddy"),
  async execute(channel, args) {
    const daddyEmbed = new MessageEmbed()
      .setColor("#FF4500")
      .setTitle("Tyler1")
      .setURL("https://i.imgur.com/dyQKrEk.jpg")
      .setAuthor({
        name: "Tyler1",
        iconURL: "https://i.imgur.com/dyQKrEk.jpg",
        url: "https://www.twitch.tv/loltyler1",
      })
      .setDescription("You guys watch T1 recently?")
      .setThumbnail("https://i.imgur.com/dyQKrEk.jpg")
      .addFields({
        name: "T1 streaming right now",
        value: "Jesus Murphy, he's cracked",
        inline: true,
      })
      .setImage("https://i.imgur.com/dyQKrEk.jpg")
      .setFooter({ text: "Daddy pls" });

    await channel.send({ embeds: [daddyEmbed] });
  },
};
