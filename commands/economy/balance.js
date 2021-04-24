const { MessageEmbed } = require("discord.js");
const db = require("quick.db")



module.exports = {
    name: "balance",
    category: "economy",
    description: "View your balance",
    usage: `balance <@user>`,
    
    run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.author
    var amount = db.fetch(`money_${user.id}`);

    if(amount === null) amount = 0;

   
    var embed = new MessageEmbed() 
    .setTitle(`Balance from ${user.tag}`)
    .setDescription(`Money: **${amount}$**`)
    .setColor("GREEN")
    .setThumbnail(user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))

    message.channel.send(embed)
    
    }
}