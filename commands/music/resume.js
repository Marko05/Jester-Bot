const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "resume",
  description: "Resume current song",
  category: "music",
  usage: "resume",

  run: async (client , message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.reply("No Songs playing currently")
      
  if (queue.playing == true)
    return message.reply("Song is already playing")
    
  queue.connection.dispatcher.resume();
  queue.playing = true;
  return message.channel.send(
    new MessageEmbed()
    .setTitle("Resume")
    .setDescription("▶️ Successfully \`resumed\` the music")
    .setColor("RED")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
  );
}
}