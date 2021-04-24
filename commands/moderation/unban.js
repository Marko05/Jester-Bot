const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
        name: "unban",
        description: "Unban a user from the guild",
        category: "moderation",
        usage: "unban <@user | User ID | User Name> <reason> (optional)",
    
    run: async (client, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You Dont Have The Permissions To Unban Someone! - [BAN_MEMBERS]")

        if (!args[0]) return message.reply("Please enter a user")
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.reply("Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned")

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("I Don't Have Permissions To Unban Someone! - [BAN_MEMBERS]")
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                .setTitle("Unban")
                    .setColor("GREEN")
                    .setDescription(`${bannedMember.user.tag} has been unbanned for ${reason}`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTimestamp()
                message.channel.send(sembed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setTitle("Unban")
                    .setColor("RED")
                    .setTimestamp()
                    .setDescription(`${bannedMember.user.tag} has been unbanned`)
                    .setThumbnail(client.user.displayAvatarURL())
                message.channel.send(sembed2)
            }
        } catch {
            
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("Moderation", "Unban")
            .addField("Unbanned", `${bannedMember.user.tag}`)
            .addField("ID", `${bannedMember.user.id}`)
            .addField("Moderator", message.author.tag)
            .addField("Reason", `${reason}` || "No Reason")
            .addField("Date", message.createdAt.toLocaleString())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
    
}