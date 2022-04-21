const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "daddy",
  description: "I mean, it's daddy",
  execute(message, args) {
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

      message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send({ embeds: [daddyEmbed] });
  },
};
