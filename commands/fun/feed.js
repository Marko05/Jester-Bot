const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "feed",
    category: "fun",
    description: "Feeds a user",
    usage: `feed <@user>`,
    
    run: async (client, message, args) => {

    const user = message.mentions.users.first()
    if(!user) return message.reply("Please mention a user")

    if(message.mentions.users.first().id == message.author.id) return message.reply("You cannot feed yourself")

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/feed")

    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} feeds ${user.username}! <3`)
    .setImage(body.url)
    .setColor("PURPLE")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())

    message.channel.send(embed)

    }
}