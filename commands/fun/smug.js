const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "smug",
    category: "fun",
    description: "Smugs hisself",
    usage: `smug`,
    
    run: async (client, message, args) => {

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/smug")

    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} smugs hisself`)
    .setImage(body.url)
    .setColor("PURPLE")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())

    message.channel.send(embed)

    }
}