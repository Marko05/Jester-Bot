const Discord = require('discord.js')

module.exports = {
        name: "lock",
        category: "moderation",
        description: "lock server",
        usage: "lock <on/off>",
    
    run: async (client, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.reply("You Dont Have The Permissions To Lock The Server! - [ADMINISTRATOR]");

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            })
            
            let lockEmbed = new Discord.MessageEmbed()
                .setTitle("Lock")
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`\n\nDone! Server Fully Locked! 🔒`)
                .setColor('GREEN')
                .setTimestamp()
            return message.channel.send(lockEmbed);

        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
            
            let lockEmbed2 = new Discord.MessageEmbed()
            .setTitle("Unlock")
                .setColor('RED')    
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`Done! Server Fully Unlocked! 🔓`)
                .setTimestamp()
            return message.channel.send(lockEmbed2)
        }
    }
}