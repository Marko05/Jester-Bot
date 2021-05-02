const { MessageEmbed } = require('discord.js');
const db = require("quick.db")

module.exports = {
        name: "channel-create",
        category: "moderation",
        description: "Creates a channel",
        usage: "channel-create <Channel Name>",
        aliases: ["cc" , "c-c"],
    
    run: async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.reply("You Dont Have The Permissions To Create Channels! - [MANAGE_CHANNELS]")

    const name = args.slice(0).join(" ")
    if(!name) return message.reply("Please provide a name")

    message.guild.channels.create(name).then((ch) => {
            message.reply(`Successfully created the Channel ${ch}`)

    let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Channel-Create")
                .addField("Channel Created", ch)
                .addField("Channel ID", ch.id)
                .addField("Created By", message.author.tag)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)

    })  
}
}
