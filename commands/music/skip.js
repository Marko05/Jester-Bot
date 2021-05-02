const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "skip",
  description: "Skips the current song",
  category: "music",
  usage: "skip",
  aliases: ["s"],

  run: async (client, message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.reply("No Songs playing currently")
  queue.connection.dispatcher.end('skipped');
  return message.channel.send(
    new MessageEmbed()
      .setTitle("Skip")
      .setDescription("⏭ Successfully \`skipped\` current song")
      .setColor("RED")
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
  );


}
}