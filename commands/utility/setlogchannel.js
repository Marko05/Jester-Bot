const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
        name: "setlogchannel",
        category: "utility",
        description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
        usage: "setlogchannel <@channel | channel ID | channel name>",
    
    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**You Do Not Have The Required Permissions! - [ADMINISTRATOR]")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.reply(
          `\`${channelName.name}\` is already set as Modlogchannel!`
        );
      } else
        return message.reply(
          "Please mention the channel or provide an valid ID"
        );
    }
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("**Please Enter A Valid Text Channel!**");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("**This Channel is Already Set As Modlog Channel!**")
            } else {
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Modlog Channel Set!**")
                db.set(`modlog_${message.guild.id}`, channel.id)

                const embed = new MessageEmbed()
                .setTitle(`SetLogChannel`)
                .setDescription(`Successfully set the log channel to <#${channel.id}>`)
                .setColor("RED")
                .setTimestamp()

                message.channel.send(embed)
            }
        } catch {
            return message.reply("Error - `Missing Permissions Or Channel Is Not A Text Channel!`");
        }
    }
}
