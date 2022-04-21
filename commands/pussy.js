const { get } = require("snekfetch");

module.exports = {
  name: "pussy",
  description: "Cute cat pics.",
  execute(message, args) {
    try {
      get("https://aws.random.cat/meow").then((response) => {
        message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send({
          files: [
            {
              attachment: response.body.file,
              name: `cat.${response.body.file.split(".")[4]}`,
            },
          ],
        });
      });
    } catch (e) {
      message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("Error fetching pussy ):");
    }
  },
};
