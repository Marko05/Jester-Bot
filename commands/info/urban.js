const { MessageEmbed } = require("discord.js")
const urban = require("relevant-urban")

module.exports = {
    name: "urban",
    category: "info",
    description: "Gives you informations about a word",
    usage: `urban <word>`,
    
    run: async (client, message, args) => {

    if(!args [0]) return message.reply("Please provide a word")

    const result = await urban(args[0]).catch(e => {
    return message.reply(`Unknown word or phrase \`${query}\``)
    
    })

    const embed = new MessageEmbed()
    .setTitle(result.word)
    .setColor("RED")
    .setURL(result.urbanURL)
    .addField("Definition" , result.definition)
    .addField("Example" , result.example)
    .addField("Author" , result.author , true)
    .addField("Rating" , `:thumbsup: ${result.thumbsUp.toLocaleString()} | :thumbsdown: ${result.thumbsDown.toLocaleString()}`)

    if (result.tags.length > 0 && result.tags.join(" ").length < 1024) {
      embed.addField("Tags" , result.tags.join(", ") , true)
    }

    return message.channel.send(embed)


    }
}
