const mongoCurrency = require('discord-mongo-currency')
const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "beg",
    category: "economy",
    description: "Beg to make money",
    usage: `beg`,
    
    
    run: async (client, message, args) => {

    const randomCoins = Math.floor(Math.random() * 50) + 1;

    const giver = ["Ariana Grande" , "Kylie Jenner" , "Cristiano Ronaldo" , "Lionel Messi" , "Elon Musk" , "Donald Trump" , "Justin Bieber" , "David Beckham" , "Katy Perry" , "Rihanna" , "Adele" , "Neymar"]

    const give = giver[Math.floor(Math.random() * giver.length)]

    const embed1 = new MessageEmbed()
    .setTitle(`Beg`)
    .setDescription(`${message.author.tag} begged to \`${give}\` and earnt \`${randomCoins}$\``)
    .setColor("BLUE")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed1)

    await mongoCurrency.giveCoins(message.member.id, message.guild.id, randomCoins);




}
}
