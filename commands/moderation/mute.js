const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')
const db = require("quick.db")

module.exports = {
    name : 'mute',
    category: 'moderation',
    description: 'Mutes a User',
    usage: 'mute <@User> <reason>(optional)',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MUTE_MEMBERS')) return message.reply('You Dont Have The Permissions To Mute A User! - [MUTE_MEMBERS]')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.reply('Please provide a user')
        const reason = args.slice(1).join(" ")
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.reply('Muted role not found, creating one now...')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: [],
                        color: '#000000'
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Successfully created Muted Role')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.reply(`${Member} has already been muted.`)
        await Member.roles.add(role2)
        const embed1 = new MessageEmbed()
        .setTitle("Mute")
        .setDescription(`Successfully muted ${Member} for \`${reason || "No Reason"}\``)
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
                .addField("Moderation", "Mute")
                .addField("Muted User", Member)
                .addField("User ID", `${Member.id}`)
                .addField("Muted By", message.author.tag)
                .addField("Reason" , `${reason || "No Reason"}`)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
    }
}
            
            
        
