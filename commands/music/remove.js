const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "remove",
  description: "Removes a song from the queue",
  category: "music",
  usage: "remove <queue number>",
  aliases: ["rem"],

  run: async (client , message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );
  if (!args[0])
    return message.reply("Please provide a song number")

  if (isNaN(args[0]))
    return message.reply("Please provide a real number \`Example: >>remove 3\`")

  let queue = message.client.queue.get(message.guild.id);
  if (args[0] == 1)
    return message.reply("Cannot remove currently playing song, use command \`skip\`")

  if (queue.queue.length == 1)
    return message.reply("Can't remove when only one song is playing, Use command \`stop\`")
  if (args[0] > queue.queue.length)
    return message.reply("Queue dont have many songs")

  if (!queue)
    return message.reply("No Songs currently playing")

  var name = queue.queue[args[0] - 1].name;
  queue.queue.splice(args[0] - 1);
  return message.channel.send(
    new MessageEmbed()
      .setTitle("Remove")
      .setDescription(
        `Successfully removed \`${name}\` from the queue`
      )
      .setColor("RED")
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
  );
}
}