const { MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports=  {
    name : 'unmute',
    category: 'moderation',
    description: 'Unmutes a User',
    usage: 'unmute <@User>',

    run : async(client, message, args) => {

        if(!message.member.hasPermission("MUTE_MEMBERS"))
        return message.reply("You Dont Have The Permissions To Unmute Users! - [MUTE_MEMBERS]")

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.reply('Please provide a user')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        if(!Member.roles.cache.has(role.id))
        return message.reply("This user is not Muted")

        await Member.roles.remove(role)

        const embed1 = new MessageEmbed()
        .setTitle("Unmute")
        .setDescription(`Successfully unmuted ${Member}`)
        .setTimestamp()
        .setColor("RED")
        .setThumbnail(client.user.displayAvatarURL())

        message.channel.send(embed1)

        let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            let embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(Member.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Unmute")
                .addField("Unmuted User", Member)
                .addField("User ID", `${Member.id}`)
                .addField("Unmuted By", message.author.tag)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
    }
}