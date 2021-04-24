const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "dog",
    category: "fun",
    description: "Sends an random dog Image/GIF",
    usage: `dog`,
    
    run: async (client, message, args) => {

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/woof")

    const embed = new MessageEmbed()
    .setTitle(`Wuff!`)
    .setImage(body.url)
    .setColor("RED")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())

    message.channel.send(embed)

    }
}