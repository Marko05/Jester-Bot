const { MessageEmbed } = require("discord.js")
const superagent = require("superagent")

module.exports = { 
    name: "avatar", 
    category: "utility",
    description: "Shows your avatar or user avatar",
    usage: "avatar <@user>",
    
    run: async (client, message, args) => { 

    const user = message.mentions.users.first() || message.guild.members.cache.get(args [0]) || message.author

    const avatar = user.displayAvatarURL({size: 4096 , dynamic: true})

    const embed = new MessageEmbed()
    .setTitle(`Avatar from ${user.tag}`)
    .setDescription(`[Image Link](${user.avatarURL()})`)
    .setColor("RED")
    .setImage(`${avatar}`)
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())
    .setTimestamp()

    message.channel.send(embed)
    }
}   