const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "fact",
    category: "info",
    description: "Sends a random fact",
    usage: `fact`,
    
    run: async (client, message, args) => {

    const { body } = await superagent
    .get("https://nekos.life/api/v2/fact")

    const embed = new MessageEmbed()
    .setTitle(`Fact`)
    .setDescription(`${body.fact}`)
    .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL())
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RED")

    message.channel.send(embed)

    }
}