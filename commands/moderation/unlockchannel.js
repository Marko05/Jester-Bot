const Discord = require('discord.js');

module.exports = {
        name: "unlockchannel",
        category: "moderation",
        description: "unlock channel",
        usage: "unlockchannel",
        aliases: ["ulc" , "unlockc"],

    run: async (client, message, args) => {
        
         if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.reply("You Dont Have The Permissions To Lock A Channel! - [ADMINISTRATOR]");

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);
        }
         let lockEmbed = new Discord.MessageEmbed()
                .setTitle("Unlockchannel")
                .setColor('RED')    
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`Done! Channel Fully Unlocked! 🔓`)
                .setTimestamp()
            return message.channel.send(lockEmbed);
    }
}