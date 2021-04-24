const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "owo",
    category: "fun",
    description: "Converts an normal text into an owo text",
    usage: `owo <text>`,
    
    run: async (client, message, args) => {

    const text = args.slice(0).join(" ")
    if (!text) return message.reply('Please specify an message')

    const { owo } = await fetch(`https://nekos.life/api/v2/owoify?text=${text}`).then(res => res.json())

    const embed = new MessageEmbed()
    .setTitle(`OwO`)
    .setDescription(owo)
    .setColor("RED")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())

    message.channel.send(embed)

    }
}