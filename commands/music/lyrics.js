const { MessageEmbed } = require("discord.js")
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  description: "Shows lyrics of the current song",
  category: "music",
  usage: "lyrics",
  aliases: ["ly"],

  run: async (client , message, args) => {

    const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.reply("Currently no Song playing")
      .catch(console.error);

  let lyrics = null;

  try {
    lyrics = await lyricsFinder(queue.queue[0].name, "");
    if (!lyrics) lyrics = `:x: Cannot find lyrics`;
  } catch (error) {
    lyrics = `Cannot find lyrics`;
  }

  let lyricsEmbed = new MessageEmbed()
    .setTitle(`Lyrics for ${queue.queue[0].name}`)
    .setDescription(lyrics)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RED")
    .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp();

  if (lyricsEmbed.description.length >= 2048)
    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
  return message.channel.send(lyricsEmbed).catch(console.error);
  }
}