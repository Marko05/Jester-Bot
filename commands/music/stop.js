const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "stop",
  description: "Stop current song",
  category: "music",
  usage: "stop",

  run: async (client , message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.reply("No Songs playing currently")
    
    
  queue.connection.dispatcher.end();
  queue.playing = [];
  return message.channel.send(
    new MessageEmbed()
    .setTitle("Stop")
    .setDescription("🛑 Successfully \`stopped\` the music")
    .setColor("RED")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
  );
}
}