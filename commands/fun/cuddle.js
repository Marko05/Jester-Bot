const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "cuddle",
    category: "fun",
    description: "Cuddles a user",
    usage: `cuddle <@user>`,
    
    run: async (client, message, args) => {

    const user = message.mentions.users.first() || message.guild.members.cache.get(args [0])

    if(user.id == message.author.id) return message.reply("You cannot cuddle yourself")

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/cuddle")

    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} cuddles ${user.username}!`)
    .setImage(body.url)
    .setColor("PURPLE")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())

    message.channel.send(embed)

    }
}