const { MessageEmbed } = require("discord.js")

module.exports = {

    name: "poll",
    category: "moderation",
    description: "Create a poll",
    usage: "poll <#channel> <poll>",
    

    run: async(bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_ROLES")) 
    return message.reply(`:x: **|** You donΒ΄t have permissions`)

    var pollchannel = message.mentions.channels.first();
    if(!pollchannel) return message.reply("Please mention a channel")
    
    var poll = args.slice(1).join(" ")
    if(!poll) return message.reply("Please specify a question")

    const embed = new MessageEmbed()
    .setTitle(`π | New Poll from ${message.author.tag}`)
    .setDescription(`Poll: **${poll}**`)
    .setThumbnail(message.author.displayAvatarURL())
    .setColor("RED")
    .setTimestamp()

    const msgEmbed = await pollchannel.send(embed)
    await msgEmbed.react(`π`)
    await msgEmbed.react(`π€·ββοΈ`)
    await msgEmbed.react(`π`)

    

    }
}