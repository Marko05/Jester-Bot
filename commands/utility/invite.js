const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "invite",
  description: "Invite Links",
  category: "utility",
  usage: "invite",
  aliases: ["inv"],

  run: async (client , message, args) => {

  const embed = new MessageEmbed()
  .setTitle('Invite')
  .setThumbnail(client.user.displayAvatarURL())
  .setColor("RED")
  .setDescription("[Invite Jester](https://discord.com/oauth2/authorize?client_id=828262455767203842&permissions=2419244150&scope=bot)\n[Support Server](https://discord.gg/mzNAPvTUbN)[Void Bots](https://voidbots.net/bot/828262455767203842/)")
  .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL())
  .setTimestamp()

  message.channel.send(embed)
  }
}