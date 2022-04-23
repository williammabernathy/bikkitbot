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
        command = args[0].toLowerCase();

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
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            guildQueue.skip();
        }

        if (command === 'stop') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            guildQueue.stop();
        }

        if (command === 'removeloop') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
        }

        if (command === 'toggleloop') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
        }

        if (command === 'togglequeueloop') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
        }

        if (command === 'setvolume') {
            if (typeof args[1] === 'undefined' || args[1] === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("You must specify a volume level (0-200)!");
                return;
            }

            guildQueue.setVolume(parseInt(args[1]));
        }

        if (command === 'seek') {
            if (typeof args[1] === 'undefined' || args[1] === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("You must specify a time (in seconds)!");
                return;
            }

            guildQueue.seek(parseInt(args[1]) * 1000);
        }

        if (command === 'clearqueue') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            guildQueue.clearQueue();
        }

        if (command === 'shuffle') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            guildQueue.shuffle();
        }

        if (command === 'getqueue') {
            const songEmbed = new MessageEmbed()
                .setColor("#FF4500")
                .setTitle("Music Queue")
                .setDescription("Songs currently in queue");

            guildQueue.songs.forEach((s, idx) => {
                songEmbed.addField(`# in queue: ${idx + 1}`, `${s.name}`);
            });

            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send({ embeds: [songEmbed] });
        }

        if (command === 'getvolume') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send(`Current volume: ${guildQueue.volume}`)
        }

        if (command === 'nowplaying') {
            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send(`Now playing: ${guildQueue.nowPlaying}`);
        }

        if (command === 'pause') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            guildQueue.setPaused(true);
        }

        if (command === 'resume') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            guildQueue.setPaused(false);
        }

        if (command === 'remove') {
            if (typeof args[1] === 'undefined' || args[1] === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("You must specify a queue position!");
                return;
            }

            guildQueue.remove(parseInt(args[1]));
        }

        if (command === 'progressbar') {
            if (typeof guildQueue === 'undefined' || guildQueue === undefined) {
                message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send("There are no songs in queue");
                return;
            }

            const ProgressBar = guildQueue.createProgressBar();

            message.guild.channels.cache.find(ch => ch.name === 'bot-spam').send(ProgressBar.prettier);
        }
    },
};