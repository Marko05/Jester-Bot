const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "tickle",
    category: "fun",
    description: "Tickles a user",
    usage: `+tickle [@user]`,
    
    run: async (client, message, args) => {

    const user = message.mentions.users.first()
    if(!user) return message.reply("Please mention a user")
    
    if(message.mentions.users.first().id == message.author.id) return message.reply("You cannot tickle yourself")

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/tickle")

    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} tickles ${user.username}!`)
    .setImage(body.url)
    .setColor("PURPLE")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())

    message.channel.send(embed)

    }
}