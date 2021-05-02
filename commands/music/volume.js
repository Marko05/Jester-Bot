const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "volume",
  description: "Sets the volume",
  category: "music",
  usage: "volume <1-100>",
  aliases: ["vol" , "v"],

  run: async (client, message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );

  let queue = message.client.queue.get(message.guild.id);

  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Current Volume"
        )
        .setColor("RED")
        .setDescription(`Current volume is \`${queue.volume}\``)
        .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
    );

  if (args[0] > 100)
    return message.reply(`Please provide a number between \`1-100\``)

  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  queue.volume = args[0];
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Volume"
      )
      .setColor("RED")
      .setDescription(`Set the Volume to \`${args [0]}\``)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
  );

  }
}