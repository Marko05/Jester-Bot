const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "skipto",
  description: "Skip to a song",
  category: "music",
  usage: "skipto <queue number>",

  run: async (client , message, args) => {
        
  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.reply("No Songs currently playing")

  if (!args[0])
    return message.reply("Please provide a real number \`Example: >>skipto 3\`")

  if (isNaN(args[0]))
    return message.
   queue.playing = !false;

  if (queue.loop) {
    for (let i = 0; i < parseInt(args[0]) - (1 + 1); i++) {
      var delta = queue.queue.shift();
      queue.queue.push(delta);
    }
  } else {
    queue.queue = queue.queue.slice(parseInt(args[0]) - (1 + 1));
  }

  try {
    queue.connection.dispatcher.end();
  } catch (e) {
    console.log(e);
    message.client.queue.delete(message.guild.id);
    queue.vc.leave();
  }

  return message.channel.send(
    new MessageEmbed()
      .setTitle("Skipto")
      .setDescription(
        "⏯ Skipped the music to" +
          " `" +
          `\`${args [0]}\`` +
          "` " +
          ""
      )
      .setColor("RED")
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
  );
}
}