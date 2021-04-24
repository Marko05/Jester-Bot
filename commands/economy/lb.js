const mongoCurrency = require('discord-mongo-currency');
const { MessageEmbed } = require('discord.js');

  module.exports = {
    name: "lb",
    category: "economy",
    description: "Shows the leaderboard",
    usage: `lb`,
    
    
    run: async (client, message, args) => {
 
   
    
    const leaderboard = await mongoCurrency.generateLeaderboard(message.guild.id, 20);
        let people = [];let counter = 1
        leaderboard.forEach(i => {
            let person = client.users.cache.get(i.userId)
            if(!person) return
            if(counter >= 11) return
            people.push(`\`#${counter}\` **${client.users.cache.get(i.userId).tag}** - :coin: \`${i.coinsInWallet}\``)
            counter += 1
        })
    if (leaderboard.length < 1) return message.channel.send("Nobody's on the leaderboard.");
    const embed = new MessageEmbed()
    .setTitle(`${message.guild.name}\'s Leaderboard`)
    .setDescription(`${people.join('\n')}`)
    .setColor("RED")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    
    message.channel.send(embed);

    }
  }