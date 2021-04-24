const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    
        name: "mute",
        description: "Mutes a User",
        category: "moderation",
        usage: "mute <@user | User Name | User ID> <reason> (optional)",

    run: async (bot, message, args) => {
                                
    if (!message.member.hasPermission("MANAGE_GUILD")) 
    return message.reply(`You don´t have permissions to mute someone - [MANAGE_GUILD]`)

    if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.reply("I Don't Have Permissions To Mute Someone! - [MANAGE_GUILD]")

    const mutee = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!mutee) return message.reply("Please mention a user")

    if (mutee.id === message.author.id)
    return message.reply("You cannot mute yourself!")

    const reason = args.slice(1).join(" ")
  
    const muterole = message.guild.roles.cache.find(r => r.name === `Muted`)
    if(!muterole) return message.reply("You need a role called \`Muted\`")

    if (mutee.roles.cache.has(muterole.id))
    return message.reply("This User is already Muted")

    mutee.role.add(role);

        if (reason) {
          const sembed = new MessageEmbed()
              .setTitle("Mute")
              .setColor("RED")
              .setThumbnail(client.user.displayAvatarURL())
              .setDescription(`\`${mutee.user.tag}\` was successfully muted for \`${reason}\``)
              .setTimestamp()
                message.channel.send(sembed);
                } else {
                    const sembed2 = new MessageEmbed()
                    .setTitle("Mute")
                    .setColor("RED")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setDescription(`${mutee.user.tag} was successfully muted`)
                    .setTimestamp()
                message.channel.send(sembed2);
                }
            
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            let embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Mute")
                .addField("Muted User", mutee.user.tag)
                .addField("User ID", `${mutee.id}`)
                .addField("Muted By", message.author.tag)
                .addField("Reason", `${reason || "No Reason"}`)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        
    }
}