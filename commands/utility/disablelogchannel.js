const db = require('quick.db');

module.exports = {
        name: "disablelogchannel",
        category: 'utility',
        description: 'Disables Server Modlog Channel',
        usage: 'disablelogchannel <#channel | channel name | channel ID>',

    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.reply("You Do Not Have The Required Permissions! - [ADMINISTRATOR]")

        try {
            let a = db.fetch(`modlog_${message.guild.id}`)

            if (!a) {
                return message.reply('There Is No Modlog Channel Set To Disable')
            } else {
                let channel = message.guild.channels.cache.get(a)
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("Logchannel Disabled!")
                db.delete(`modlog_${message.guild.id}`)

                message.channel.send(`Successfully disabled Modlogchannel in \`${channel.name}\``)
            }
            return;
        } catch {
            return message.channel.send("**Error - `Missing Permissions or Channel Doesn't Exist`**")
        }
    }
}