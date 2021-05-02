const schema = require('../../models/custom-commands');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cc-list",
    description: 'Shows all Custom Commands in this server',
    category: 'custom-commands',
    usage: 'list',
    aliases: ["cc-l"],

    run: async(client, message, args) => {
        const data  = await schema.find({ Guild: message.guild.id });
        if(!!data === false) return message.reply('There is no custom commands');
        message.channel.send(
            new MessageEmbed()
                .setAuthor(`Custom Command List of ${message.guild.name}` , message.guild.iconURL({dynamic: true}))
                .setColor('RED')
                .setDescription(
                    data.map((cmd, i) => 
                        `\`${i + 1}:\` **${cmd.Command}**` || "No Commands Found"
                    ).join('\n')
                )
                .setTimestamp()
                .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
        )
    }
}