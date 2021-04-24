const { MessageEmbed } = require("discord.js")
const mongoCurreny = require("discord-mongo-currency")

module.exports = {
    name: "buy",
    category: "economy",
    description: "Buys a item from the shop",
    usage: `buy [item]`,
    
    run: async (client, message, args) => {

    const user = message.author

    var author = mongoCurreny.findUser(message.author.id , message.guild.id);
    
    if(!args[0])
    return message.channel.send("Please specify a item")

    if(args[0] === "rod") {
    if (author.coinsInWallet < 1000) {
        return message.channel.send(":x: **|** You need at least \`1000$\`")
    } else {
        const embed = new MessageEmbed()
        .setTitle(`Buy`)
        .setDescription(`🎣 **|** Successfully bought \`1x Rod\``)
        .setColor("GREEN")
        .setTimestamp()

        message.channel.send(embed)

        mongoCurreny.deductCoins(message.author.id , message.guild.id , 1000)

    }
}

    if(args[0] === "sword") {
    if(author.coinsInWallet < 3000) {
        return message.channel.send(":x: **|** You need at least \`3000$\`")
    } else {
        

        const embed2 = new MessageEmbed()
        .setTitle(`Buy`)
        .setDescription(`⚔️ **|** Successfully bought \`1x Sword\``)
        .setColor("GREEN")
        .setTimestamp()

        message.channel.send(embed2)

        mongoCurreny.deductCoins(message.author.id , message.guild.id , 3000)

    }
}
    
    if (args[0] === "pickaxe") {
    if(author.coinsInWallet < 4000) {
    return message.channel.send(":x: **|** You need at least \`4000$\`")
    } else {

        const embed3 = new MessageEmbed()
        .setTitle(`Buy`)
        .setDescription(`⛏️ **|** Successfully bought \`1x Pickaxe\``)
        .setColor("BLUE")
        .setTimestamp()

        message.channel.send(embed3)

        mongoCurreny.deductCoins(message.author.id , message.guild.id , 4000)

    }
}

    if(args [0] === "gun") {
    if(author.coinsInWallet < 6000) {
    return message.channel.send(":x: **|** You need at least \`6000$\`")
    } else {
    
        const embed4 = new MessageEmbed()
        .setTitle(`Buy`)
        .setDescription(`🔫 **|** Successfully bought \`1x Gun\``)
        .setColor("BLUE")
        .setTimestamp()

        message.channel.send(embed4)

        mongoCurreny.deductCoins(message.author.id , message.guild.id , 6000)
    }
}
}
}