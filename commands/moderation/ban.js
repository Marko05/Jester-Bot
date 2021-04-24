const { MessageEmbed } = require('discord.js');
const db = require('quick.db')


module.exports = {
        name: "ban",
        category: "moderation",
        description: "Bans the user",
        usage: "ban <@user | User name | User ID> <reason> (optional)",
    
    run: async (client, message, args) => {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.reply("You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]");
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]");
            if (!args[0]) return message.reply("Please provide a user to ban")

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.reply("User Is Not In The Guild");
            if (banMember === message.member) return message.reply("You Cannot Ban yourself")

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.reply("Cant Ban That User")
            try {
            message.guild.members.ban(banMember)
            banMember.send(`You Have Been Banned From ${message.guild.name} for - ${reason || "No Reason"}`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
            .setTitle("Ban")
                .setColor("RED")
                .setDescription(`${banMember.user.tag} has been banned for ${reason}`)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setTitle("Ban")
                .setThumbnail(client.user.displayAvatarURL())
                .setColor("RED")
                .setDescription(`${banMember.user.tag} has been banned`)
                .setTimestamp()
            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Ban")
                .addField("Banned User", banMember.user.tag)
                .addField("ID", `${banMember.id}`)
                .addField("Banned By", message.author.tag)
                .addField("Reason", `${reason || "No Reason"}`)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};