const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

module.exports = {
    name: "fish",
    category: "economy",
    description: "Fish some fishes with the rod",
    usage: `fish`,
    
    run: async (client, message, args) => {

    if (db.has(`${message.author.id}`, "rod") === true) {
        const timeoutfished = 900000
        const fished =  db.fetch(`fished_${message.author.id}`)

        if(fished != null && timeoutfished - (Date.now() - fished) > 0) {
        const time = ms(timeoutfished - (Date.now() - fished));
        message.channel.send(`You already fished, please come back in **${time.hours}h** **${time.minutes}m** **${time.seconds}s**`)

    } else {  
        
    const amountearned = Math.floor(Math.random() * 500) +1
    const fishes = ["Bluefish" , "Herring" , "Goldfish" , "Salmon" , "Sardine" , "Sea Trout" , "Snapper" , "Sole" , "Swordfish" , "Carp" , "Butterfish"]
    const fish = fishes[Math.floor(Math.random() * fishes.length)]

    const embed = new MessageEmbed()
    .setTitle(`Fish`)
    .setDescription(`🎣 It paid off! You caught a \`${fish}\` and earnt \`${amountearned}$\``)
    .setColor("RED")

    message.channel.send(embed)
    db.add(`money_${message.author.id}` , amountearned)
    db.set(`fished_${message.author.id}` , Date.now())


}

    } else {

    if(db.has(`${message.author.id}` , "rod") === false) {
        return message.channel.send(`You dont have a \`rod\``)

    }
}
}
}