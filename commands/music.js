const { Player, RepeatMode } = require('discord-music-player');
const { MessageEmbed } = require("discord.js");
const output = require('fluent-ffmpeg/lib/options/output');

module.exports = {
    name: "music",
    description: "Handles youtube music playing",
    async execute(message, args) {

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send(
                "You need to be in a voice channel to play music!"
            );
            return;
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send(
                "I need the permissions to join and speak in your voice channel!"
            );
            return;
        }

        let guildQueue = message.client.player.getQueue(message.guild.id);
        command = args[0]

        if (command === 'play') {
            let queue = message.client.player.createQueue(message.guild.id);

            await queue.join(message.member.voice.channel);

            let song = await queue.play(args.join(' ')).catch(_ => {
                if (!guildQueue)
                    queue.stop();
            });
        }

        if (command === 'playlist') {
            let queue = message.client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel);

            let song = await queue.playlist(args.join(' ')).catch(_ => {
                if (!guildQueue)
                    queue.stop();
            });
        }

        if (command === 'skip') {
            guildQueue.skip();
        }

        if (command === 'stop') {
            guildQueue.stop();
        }

        if (command === 'removeLoop') {
            guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
        }

        if (command === 'toggleLoop') {
            guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
        }

        if (command === 'toggleQueueLoop') {
            guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
        }

        if (command === 'setVolume') {
            guildQueue.setVolume(parseInt(args[0]));
        }

        if (command === 'seek') {
            guildQueue.seek(parseInt(args[0]) * 1000);
        }

        if (command === 'clearQueue') {
            guildQueue.clearQueue();
        }

        if (command === 'shuffle') {
            guildQueue.shuffle();
        }

        if (command === 'getQueue') {
            const songCount = guildQueue.songs.length;
            let output = '';
            // guildQueue.songs.forEach((s, idx) => {
            //     output += `${s.name} ~ # in queue: ${idx}${idx < songCount - 1 ? ', ' : ''}`
            // });


            const songEmbed = new MessageEmbed()
                .setColor("#FF4500")
                .setTitle("Music Queue")
                .setDescription("Songs currently in queue");

            guildQueue.songs.forEach((s, idx) => {
                songEmbed.addField(`# in queue: ${idx+1}`, `${s.name}`);
            });

            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send({ embeds: [songEmbed] });
        }

        if (command === 'getVolume') {
            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send(`Current volume: ${guildQueue.volume}`)
        }

        if (command === 'nowPlaying') {
            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send(`Now playing: ${guildQueue.nowPlaying}`);
        }

        if (command === 'pause') {
            guildQueue.setPaused(true);
        }

        if (command === 'resume') {
            guildQueue.setPaused(false);
        }

        if (command === 'remove') {
            guildQueue.remove(parseInt(args[1]));
        }

        if (command === 'createProgressBar') {
            const ProgressBar = guildQueue.createProgressBar();

            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send(ProgressBar.prettier);
        }
    },
};