const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "pat",
    category: "fun",
    description: "Pats a user",
    usage: `pat <@user>`,
    
    run: async (client, message, args) => {

    const user = message.mentions.users.first()
    if(!user) return message.reply("Please mention a user")

    if(message.mentions.users.first().id == message.author.id) return message.channel.send("You cannot pat yourself")

    const { body } = await superagent
    .get("https://nekos.life/api/pat")

    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} pats ${user.username}! :heart_eyes:`)
    .setImage(body.url)
    .setColor("PURPLE")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())
    

    message.channel.send(embed)

    }
}