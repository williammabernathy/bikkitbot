const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomize")
    .setDescription("randomizes phasmophobia levels and difficulty"),
  execute(channel, args) {

    // check that args has necessary values
    if (typeof args[0] === 'undefined' || args[0] === undefined) {
      channel.send("You must specify map sizes!");
      return;
    }
    if (typeof args[1] === 'undefined' || args[1] === undefined || !args[1].includes("-")) {
      channel.send("You must specify a difficult range!");
      return;
    }


    const maps = args[0].split(",");
    const mapSizes = maps.map(ele => {
      return ele.toLowerCase();
    });

    const difficultyRange = args[1].split("-");
    const diffLow = parseInt(difficultyRange[0]) - 1;
    const diffHigh = parseInt(difficultyRange[1]) - 1;

    // specify values to randomize
    const small = ["Bleasdale Farmhouse", "Edgefield Street House", "Grafton Farmhouse", "Ridgeview Road House", "Tanglewood Street House", "Willow Street House"];
    const medium = ["Brownstone High School", "Maple Lodge Campsite", "Prison"];
    const large = ["Asylum"];
    const difficulty = ["Amateur", "Intermediate", "Professional", "Nightmare"];

    var map = [];
    var mapCount = 0;

    // add maps from sizes that were specified in arguments
    if (mapSizes.includes("s")) {
      map = map.concat(small);
      mapCount = mapCount + 1;
    }
    if (mapSizes.includes("m")) {
      map = map.concat(medium);
      mapCount = mapCount + 1;
    }
    if (mapSizes.includes("l")) {
      map = map.concat(large);
      mapCount = mapCount + 1;
    }

    // randomize the map
    const randMap = map[Math.floor(Math.random() * mapCount)]

    // randomize the difficulty
    const randDiff = difficulty[Math.floor(Math.random() * (diffHigh - diffLow + 1) + diffLow)];

    const randomEmbed = new MessageEmbed()
      .setColor("#000000")
      .setTitle("Randomized Phas Map and Difficulty")
      .addFields(
        { name: "Map", value: String(randMap), inline: true },
        { name: "Difficulty", value: String(randDiff), inline: true }
      );

    channel.send({ embeds: [randomEmbed] });
  },
};
