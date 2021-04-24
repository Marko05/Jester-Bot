const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "waifu",
    category: "fun",
    description: "Shows a random Waifu Image/GIF",
    usage: `waifu`,
    
    run: async (client, message, args) => {

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/waifu")

    const embed = new MessageEmbed()
    .setTitle(`Here is your Waifu, ${message.author.username}`)
    .setImage(body.url)
    .setColor("PURPLE")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())
    
   

    message.channel.send(embed)

    }
}