const { MessageEmbed } = require("discord.js");
const superagent = require("superagent")

module.exports = {
    name: "8ball",
    category: "fun",
    description: "Answers an question from you",
    usage: `8ball <question>`,
    
    run: async (client, message, args) => {

    const text = args.slice(0).join(" ")
    if (!text) return message.reply('Please specify a question')

     const { body } = await superagent
    .get("https://nekos.life/api/v2/8ball")

    const embed = new MessageEmbed()
    .setTitle(`8ball`)
    .setImage(body.url)
    .setColor("RED")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))

    message.channel.send(embed)

    }
}