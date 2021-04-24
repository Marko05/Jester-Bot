const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "cuddle",
    category: "fun",
    description: "Cuddles a user",
    usage: `cuddle <@user>`,
    
    run: async (client, message, args) => {

    const user = message.mentions.users.first()
    if(!user) return message.reply("Please mention a user")

    if(message.mentions.users.first().id == message.author.id) return message.reply("You cannot cuddle yourself")

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