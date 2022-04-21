module.exports = {
  name: "help",
  description: "Sends a help request.",
  execute(message, args) {
    message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send(
      `Help us <@164903491972759552>, you\'re our only hope.. (A message has also been sent) \n` +
        "Familiar with node.js, or discord bots in general? Consider putting in a ticket here: <https://github.com/williammabernathy/bikkitbot/issues> \n" +
        "Is this part of a correction or update? Submit the pull request here: <https://github.com/williammabernathy/bikkitbot/pulls>"
    );
  },
};
