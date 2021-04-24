const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {

        name: "kick",
        category: "moderation",
        description: "Kicks a user",
        usage: "kick <@user | User Name | User ID | User Nickname> <reason> (optional)",
        
    run: async (client, message, args) => {
        try {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]");
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]");

            if (!args[0]) return message.reply('Please mention a user to kick')

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.reply("Mentioned User is not in the Guild");

            if (kickMember.id === message.member.id) return message.reply("You cannot kick yourself")

            if (!kickMember.kickable) return message.reply("Cannot kick that User")
            if (kickMember.user.bot) return message.reply("Cannot kick a bot")

            var reason = args.slice(1).join(" ");
            try {
                const sembed2 = new MessageEmbed()
                .setTitle("Kick")
                    .setColor("RED")
                    .setDescription(`You Have Been Kicked From \`${message.guild.name}\` for - \`${reason || "No Reason!"}\``)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send(sembed2).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            var sembed = new MessageEmbed()
            .setTitle("Kick")
                .setColor("GREEN")
                .setDescription(`\`${kickMember.user.tag}\` has been kicked for \`${reason}\``)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(sembed);
            } else {
                var sembed2 = new MessageEmbed()
                .setTitle("Kick")
                .setColor("GREEN")
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`${kickMember.user.tag} has been kicked`)
                .setTimestamp()
            message.channel.send(sembed2);
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Kick")
                .addField("User Kicked", kickMember.user.tag)
                .addField("User ID" , kickMember.user.id)
                .addField("Kicked By", message.author.tag)
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
}