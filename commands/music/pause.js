const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "pause",
  description: "Pause current song",
  category: "music",
  usage: "pause",

  run: async (client , message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.reply("No Songs playing currently")
      
  if (queue.playing == false)
    return message.reply("Already paused the song")
    
  queue.connection.dispatcher.pause();
  queue.playing = false;
  return message.channel.send(
    new MessageEmbed()
    .setTitle("Pause")
    .setDescription("⏸ Successfully \`paused\` the music")
    .setColor("RED")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
  );
}
}