const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

module.exports = {
    name: "weekly",
    category: "economy",
    description: "Get weekly money",
    usage: `weekly`,
    
    run: async (client, message, args) => {

    const timeout = 604800000
    const amount = 600

    const weekly = db.fetch(`weekly_${message.author.id}`)

    if(weekly != null & timeout - (Date.now() - weekly) > 0) {

    var time = ms(timeout - (Date.now() - weekly))

    message.channel.send(`You already collected your weekly money. Please come back in **${time.days}d** **${time.hours}h** **${time.minutes}m** **${time.seconds}s**`)

    } else {

    const embed = new MessageEmbed()
    .setTitle(`Weekly Money | Claimed by ${message.author.tag}`)
    .setDescription(`Amount: \`${amount}\``)
    .setColor("GREEN")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()

    message.channel.send(embed)

    db.add(`weekly_${message.author.id}` , Date.now())
    db.add(`money_${message.author.id}` , amount)

    }
}
}