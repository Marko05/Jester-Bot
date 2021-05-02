const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("parse-ms")

module.exports = {
    name: "beg",
    description:"Beg some money",
    category: "economy",
    usage: "beg",

    run: async (client, message, args) => {

    const begged = db.fetch(`begged_${message.author.id}`)
    const timeout = 600000;

    if(begged != null && timeout - (Date.now() - begged) > 0) {
    var time = ms(timeout - (Date.now() - begged));
    message.channel.send(`You already begged, please come back in \`${time.hours}h ${time.minutes}m ${time.seconds}s\``)

    } else {

    const giver = ["Ariana Grande" , "Kylie Jenner" , "Cristiano Ronaldo" , "Lionel Messi" , "Elon Musk" , "Donald Trump" , "Justin Bieber" , "David Beckham" , "Katy Perry" , "Rihanna" , "Adele" , "Neymar"]

    const amountearned = Math.floor(Math.random() * 50) + 1

    const give = giver[Math.floor(Math.random() * giver.length)]

    const embed1 = new Discord.MessageEmbed()
    .setTitle(`Beg`)
    .setDescription(`${message.author} begged to \`${give}\` and earnt \`${amountearned}$\``)
    .setColor("RED")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed1)

    db.set(`begged_${message.author.id}` , Date.now())
    db.add(`money_${message.author.id}` , amountearned)

    }
}
}