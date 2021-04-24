const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const ms = require("parse-ms")


module.exports = {
    name: "work",
    category: "economy",
    description: "Work to earn some money",
    usage: `work`,
    
    
    run: async (bot, message, args) => {

    var amount = db.get(`money_${message.author.id}`);
    var worked = db.get(`worked_${message.author.id}`)
    var user = message.author;
    var timeout = 600000
    
    
    if(worked != null && timeout - (Date.now() - worked) > 0) {
    var time = ms(timeout - (Date.now() - worked));
    message.channel.send(`You already worked, please come back in **${time.hours}h** **${time.minutes}m** **${time.seconds}s**`)

    } else {

    var amountearned = Math.floor(Math.random() * 400) + 1
    var worker = ["Pilot" , "Manager" , "Programmer" , "Builder" , "Chief" , "Mechanic" , "Architect" , "Designer" , "Author" , "Doctor"]
    var work = worker[Math.floor(Math.random()*worker.length)]

    var embed = new MessageEmbed()
    .setTitle(`Work`)
    .setDescription(`${message.author.tag} worked as a \`${work}\` and earnt \`${amountearned}$\``)
    .setColor("GREEN")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    message.channel.send(embed)
    
    db.set(`worked_${message.author.id}`, Date.now())
    db.add(`money_${message.author.id}` , amountearned)
    }
}
}


