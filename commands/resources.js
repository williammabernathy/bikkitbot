const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resources')
        .setDescription('Posts Useful Phasmophobia Resources'),
    async execute(channel, args) {

        if (args[0].toLowerCase().includes("phas")) {
            const introEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Phasmophobia Resources')
                .setDescription('List of various resources the Ghost Hunters(tm) have used')
                .addFields(
                    { name: 'Spirit and Oujia Questions', value: 'https://screenrant.com/phasmophobia-spirit-box-oujia-board-questions-answer/', inline: true },
                    { name: 'Ghost Hunter\'s Almanac (Randomizer)', value: 'https://smilligan93.github.io/ghost-hunters-almanac/', inline: true },

                )

            await channel.send({ embeds: [introEmbed] });
        }
        else {
            await channel.send("No resources found for " + args[0]);
        }
    },
};