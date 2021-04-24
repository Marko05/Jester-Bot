const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "np",
  description: "Shows what song is playing currently",
  category: "music",
  usage: "np",

  run: async (client , message, args) => {

    const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.reply("No Songs playing currently")
  
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "🎶 Now Playing"
      )
      .setColor("RED")
      .setDescription(
        queue.queue[0].name
      )
      .setThumbnail(queue.queue[0].thumbnail)
      .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
  );
  }
}