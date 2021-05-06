const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    
        name: "setnick",
        category: "moderation",
        description: "Sets or change an nickname from a user",
        usage: "setnick <@user | User Name | User ID>",
        aliases: ["sn" , "setn"],

    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You Dont Have Permissions To Change Nickname! - [MANAGE_GUILD]");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.reply("I Dont Have Permissions To Change Nickname! - [CHANGE_NICKNAME]");
      
        if (!args[0]) return message.reply("Please mention a user")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.reply("Please Enter A Username!");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.reply('Cannot set or change the name of that user')

        if (!args.slice(1).join(" ")) return message.reply("Please enter a nickname");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
        .setTitle("Nickname")
            .setColor("RED")
            .setDescription(`Changed Nickname of \`${member.displayName}\` to \`${nick}\``)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed)
        } catch {
            return message.reply("Missing Permissions - [CHANGE_NICKNAME]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("Moderation", "Setnick")
            .addField("Nick Changed Of", member.user.tag)
            .addField("Nick Changed By", message.author.tag)
            .addField("Nick Changed To", args.slice(1).join(" "))
            .addField("Date", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}