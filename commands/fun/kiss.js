const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "kiss",
    category: "fun",
    description: "Kiss a user",
    usage: `kiss <@user>`,
    
    run: async (client, message, args) => {

    const user = message.mentions.users.first()
    if(!user) return message.reply("Please mention a user")

    if(message.mentions.users.first().id == message.author.id) return message.reply("You cannot kiss yourself")

    const { body } = await superagent
    .get("https://nekos.life/api/kiss")

    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} kissed ${user.username} <3`)
    .setImage(body.url)
    .setColor("PURPLE")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())

    message.channel.send(embed)

    }
}