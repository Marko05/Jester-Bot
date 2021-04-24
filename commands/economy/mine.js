const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

module.exports = {
    name: "mine",
    category: "economy",
    description: "Mine some ore with the pickaxe",
    usage: `mine`,
    
    run: async (client, message, args) => {

    if (db.has(`${message.author.id}`, "pickaxe") === true) {
        const timeoutmine = 900000
        const mine =  db.fetch(`mined_${message.author.id}`)

        if(mine != null && timeoutmine - (Date.now() - mine) > 0) {
        const time = ms(timeoutmine - (Date.now() - mine));
        message.channel.send(`You already mined, please come back in **${time.hours}h** **${time.minutes}m** **${time.seconds}s**`)

    } else {  
        
    const amountearned = Math.floor(Math.random() * 600) +1
    const ores = ["Diamond", "Gold", "Silver", "Iron", "Emerald", "Copper", "Bronze"]
    const ore = ores[Math.floor(Math.random() * ores.length)]

    const embed = new MessageEmbed()
    .setTitle(`Mine`)
    .setDescription(`⛏️ It paid off! You mined a \`${ore} Ore\` and earnt \`${amountearned}$\``)
    .setColor("GREEN")

    message.channel.send(embed)
    db.add(`money_${message.author.id}` , amountearned)
    db.set(`mined_${message.author.id}` , Date.now())


}

    } else {

    if(db.has(`${message.author.id}` , "pickaxe") === false) {
        return message.channel.send(`You dont have a \`pickaxe\`. You can buy a \`pickaxe\` on the shop by typing \`+shop\``)

    }
}
}
}