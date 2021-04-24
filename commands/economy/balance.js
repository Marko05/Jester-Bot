const { MessageEmbed } = require("discord.js");
const mongoCurrency = require('discord-mongo-currency');

module.exports = {
    name: "balance",
    category: "economy",
    description: "View your balance!",
    usage: `balance`,
    
    run: async (client, message, args) => {

    const member = message.mentions.members.first() || message.member;
 
    const user = await mongoCurrency.findUser(member.id, message.guild.id);
 
    const embed = new MessageEmbed()
    .setTitle(`${member.user.username}'s Balance`)
    .setDescription(`Wallet: **${user.coinsInWallet}**
    Bank: **${user.coinsInBank}/${user.bankSpace}**
    Total: **${user.coinsInBank + user.coinsInWallet}**`)
    .setColor("RED")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    
    message.channel.send(embed);

    }
}