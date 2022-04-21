const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resources',
    description: 'Posts Useful Phasmophobia Resources',
    execute(message, args) {

        if (typeof args[0] === 'undefined' || args[0] === undefined) {
            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("Please specify a game to display resources for.");
            return;
        }

        if (args[0].toLowerCase().includes("phas")) {
            const introEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Phasmophobia Resources')
                .setDescription('List of various resources the Ghost Hunters(tm) have used')
                .addFields(
                    { name: 'Spirit and Oujia Questions', value: 'https://screenrant.com/phasmophobia-spirit-box-oujia-board-questions-answer/', inline: true },
                    { name: 'Ghost Hunter\'s Almanac (Randomizer)', value: 'https://smilligan93.github.io/ghost-hunters-almanac/', inline: true },

                )

            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send({ embeds: [introEmbed] });
        }
        else {
            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("No resources found for " + args[0]);
        }
    },
};