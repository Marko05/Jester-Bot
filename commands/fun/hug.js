const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "hug",
    category: "fun",
    description: "Hugs a user",
    usage: `hug <@user>`,
    
    run: async (client, message, args) => {

    const user = message.mentions.users.first()
    if(!user) return message.reply("Please mention a user")

    if(message.mentions.users.first().id == message.author.id) return message.channel.send("You cannot hug yourself")

    const { body } = await superagent
    .get("https://nekos.life/api/hug")

    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} huged ${user.username}! Sweet :heart_eyes:`)
    .setImage(body.url)
    .setColor("PURPLE")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())

    message.channel.send(embed)

    }
}