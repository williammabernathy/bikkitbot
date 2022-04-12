const { SlashCommandBuilder } = require('@discordjs/builders');
const { get } = require("snekfetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pussy')
        .setDescription('Cute cat pics.'),
    async execute(channel, args) {

        try {
            get('https://aws.random.cat/meow').then(response => {
                channel.send({ files: [{ attachment: response.body.file, name: `cat.${response.body.file.split('.')[4]}` }] });
            })
        } catch (e) {
            channel.send('Error fetching pussy ):');
        }
    },
};