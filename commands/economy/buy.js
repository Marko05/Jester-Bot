const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "buy",
    category: "economy",
    description: "Buys a item from the shop",
    usage: `+buy <item>`,
    
    run: async (bot, message, args) => {

    const user = message.author

    var author = db.fetch(`money_${user.id}`);
    
    if(!args[0])
    return message.reply("Please provide a item")

    if(args[0] === "rod") {
    if (author < 1000) {
        return message.reply("You need at least \`1000$\`")
    } else {
        db.push(message.author.id, 'rod')
        const embed = new MessageEmbed()
        .setTitle(`Buy`)
        .setDescription(`🎣 **|** Successfully bought \`1x Rod\``)
        .setColor("RED")
        .setTimestamp()

        message.channel.send(embed)

        db.subtract(`money_${message.author.id}` , 1000)

    }
}

    if(args[0] === "sword") {
    if(author < 3000) {
        return message.reply("You need at least \`3000$\`")
    } else {
        db.push(message.author.id , "sword")
        const items = db.fetch(message.author.id, { items: [] })

        const embed2 = new MessageEmbed()
        .setTitle(`Buy`)
        .setDescription(`⚔️ **|** Successfully bought \`1x Sword\``)
        .setColor("GREEN")
        .setTimestamp()

        message.channel.send(embed2)

        db.subtract(`money_${message.author.id}` , 3000)

    }
}
    
    if (args[0] === "pickaxe") {
    if(author < 4000) {
    return message.reply("You need at least \`4000$\`")
    } else {
        db.push(message.author.id , "pickaxe")
        const items = db.fetch(message.author.id, { items: [] })

        const embed3 = new MessageEmbed()
        .setTitle(`Buy`)
        .setDescription(`⛏️ **|** Successfully bought \`1x Pickaxe\``)
        .setColor("RED")
        .setTimestamp()

        message.channel.send(embed3)

        db.subtract(`money_${message.author.id}` , 4000)

    }
}

    if(args [0] === "gun") {
    if(author < 6000) {
    return message.reply("You need at least \`6000$\`")
    } else {
        db.push(message.author.id , "gun")
        const items = db.fetch(message.author.id, { items: [] })

        const embed4 = new MessageEmbed()
        .setTitle(`Buy`)
        .setDescription(`🔫 **|** Successfully bought \`1x Gun\``)
        .setColor("RED")
        .setTimestamp()

        message.channel.send(embed4)

        db.subtract(`money_${message.author.id}` , 6000)
    }
}
}
}