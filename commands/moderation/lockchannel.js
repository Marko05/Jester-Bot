const Discord = require('discord.js');

module.exports = {
        name: "lockchannel",
        category: "moderation",
        description: "lock channel",
        usage: "lockchannel",
        aliases: ["lc" , "lockc"],

    run: async (client, message, args) => {
        
         if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.channel.reply("You Dont Have The Permissions To Lock A Channel! - [ADMINISTRATOR]");

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e);
        }
         let lockEmbed = new Discord.MessageEmbed()
                .setTitle("Lockchannel")
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`\n\nDone! Channel Fully Locked! 🔒`)
                .setColor('GREEN')
                .setTimestamp()
            return message.channel.send(lockEmbed);
    }
}