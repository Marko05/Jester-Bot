const { MessageEmbed } = require('discord.js');
const db = require("quick.db")

module.exports = {
        name: "channel-delete",
        category: "moderation",
        description: "Deletes a channel",
        usage: "channel-delete <#Channel>",
        aliases: ["cd" , "c-d"],
    
    run: async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.reply("You Dont Have The Permissions To Create Channels! - [MANAGE_CHANNELS]")

    const channelTarget = message.mentions.channels.first()
    if(!channelTarget) return message.reply("Please mention a channel to delete")

    channelTarget.delete()
    .then((ch) => {
            message.reply(`Successfully deleted the Channel`)

    let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Channel-Delete")
                .addField("Channel Deleted", ch)
                .addField("Deleted Channel ID", ch.id)
                .addField("Deleted By", message.author.tag)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
    })

    }
}