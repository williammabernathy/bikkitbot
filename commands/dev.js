module.exports = {
  name: "dev",
  description: "various dev commands for those with permissions",
  execute(message, args) {
    message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("Dev commands (except not yet)");
  },
};
