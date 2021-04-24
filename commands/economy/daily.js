const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const Discord = require("discord.js")
const ms = require("parse-ms")


module.exports = {
    name: "daily",
    category: "economy",
    description: "Gives you a daily amount of money",
    usage: `daily`,
    
    run: async (bot, message, args) => {

    var timeout = 86400000
    var amount = 200

    var daily = await db.fetch(`daily_${message.author.id}`);

    if(daily != null & timeout - (Date.now() - daily) > 0) {

    var time = ms(timeout - (Date.now() - daily))

    message.channel.send(`You already collected your daily money. You can come back in **${time.hours}h** **${time.minutes}m** **${time.seconds}s**`)

    } else {
    const embed = new MessageEmbed()
    .setTitle(`Daily Money | Claimed By: ${message.author.tag}`)
    .setDescription(`Amount: \`${amount}\``)
    .setColor("GREEN")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()   

    message.channel.send(embed)
    db.add(`money_${message.author.id}`, amount)
    db.add(`daily_${message.author.id}`, Date.now())
    



    }
}
}