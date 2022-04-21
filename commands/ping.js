module.exports = {
  name: "ping",
  description: "Replies with Pong!",
  execute(message, args) {
    //message.channel.send("Pong! I can hear you!");
    message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("Pong! I can hear you!");
  },
};
