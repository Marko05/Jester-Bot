const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

module.exports = {
    name: "hunt",
    category: "economy",
    description: "Hunt some animals with the gun",
    usage: `hunt`,
    
    run: async (client, message, args) => {

    if (db.has(`${message.author.id}`, "gun") === true) {
        const timeouthunt = 900000
        const hunt =  db.fetch(`hunted_${message.author.id}`)

        if(hunt != null && timeouthunt - (Date.now() - hunt) > 0) {
        const time = ms(timeouthunt - (Date.now() - hunt));
        message.channel.send(`You already hunted, please come back in **${time.hours}h** **${time.minutes}m** **${time.seconds}s**`)

    } else {  
        
    const amountearned = Math.floor(Math.random() * 800) +1
    const animals = ["Cat" , "Cow" , "Rabbit" , "Sheep" , "Pig" , "Chicken" , "Bear" , "Gazelle" , "Hyena" , "Turkey" , "Deer" , "Antelope"]
    const animal = animals[Math.floor(Math.random() * animals.length)]

    const embed = new MessageEmbed()
    .setTitle(`Hunt`)
    .setDescription(`🔫 It paid off! You hunted a \`${animal}\` and earnt \`${amountearned}$\``)
    .setColor("BLUE")

    message.channel.send(embed)
    db.add(`money_${message.author.id}` , amountearned)
    db.set(`hunted_${message.author.id}` , Date.now())


}

    } else {

    if(db.has(`${message.author.id}` , "gun") === false) {
        return message.channel.send(`You dont have a \`gun\``)

    }
}
}
}