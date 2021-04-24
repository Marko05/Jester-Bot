const Discord = require("discord.js")

module.exports = {
  name: "shop",
  description: "Shows the shop",
  category: "economy",
  usage: "shop",

  run: async (client , message, args) => {

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Shop` , message.guild.iconURL())
    .setDescription(`If you want to buy something from the shop, type \`>>buy <item>\``)
    .setColor("RED")
    .setThumbnail(client.user.displayAvatarURL())
    .addField(`Rod` , `1000$`)
    .addField(`Sword` , `3000$`)
    .addField(`Pickaxe` , `4000$`)
    .addField(`Gun` , `6000$`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))

    message.channel.send(embed)
  }
}