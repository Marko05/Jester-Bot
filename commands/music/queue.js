const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "queue",
  description: "Shows the queue",
  category: "music",
  usage: "queue",

  run: async (client , message, args) => {

    const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );
  const queue = message.client.queue.get(message.guild.id);
  var status;
  var np;
  var count = 0;
  if (!queue) return message.reply("There is nothing in queue")
  else
    status = queue.queue
      .map((x) => {
        count += 1;
        return (
          "• " +
          "`" +
          count +
          "." +
          "` " +
          x.name
        );
      })
      .join("\n");
  if (!queue) np = status;
  else np = queue.queue[0].name;
  if (queue) thumbnail = queue.queue[0].thumbnail;
  else thumbnail = client.user.displayAvatarURL();
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Music Queue"
      )
      .setThumbnail(thumbnail)
      .setColor("RED")
      .addField("Now Playing", np, true)
      .setDescription(status)
      .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
  );

  }
}