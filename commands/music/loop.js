const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "loop",
  description: "Loop current music",
  category: "music",
  usage: "loop",

  run: async (client , message, args) => {

      const queue = message.client.queue.get(message.guild.id);

  if (!queue)
    return message.reply(
      "No Songs currently playing"
    );

  queue.loop = !queue.loop;
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Loop",
        "https://img.icons8.com/color/2x/refresh--v2.gif"
      )
      .setColor("RED")
      .setThumbnail(client.user.displayAvatarURL())
      
      .setDescription(
        "🔁 Successfully" +
          (queue.loop == true ? " \`Enabled\` " : " \`Disabled\` ") +
        " loop for current song"
      )
      .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
  )
  }
}