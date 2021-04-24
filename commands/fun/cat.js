const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "cat",
    category: "fun",
    description: "Sends an random cat Image/GIF",
    usage: `cat`,
    
    run: async (client, message, args) => {

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/meow")

    const embed = new MessageEmbed()
    .setTitle(`Meow!`)
    .setImage(body.url)
    .setColor("RED")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))

    message.channel.send(embed)

    }
}