const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
        name: "setlogchannel",
        category: "utility",
        description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
        usage: "setwelcome <#channel>",
        aliases: ["slc"],

        run: async (client, message, args) => {

        const channel = message.mentions.channels.first()
        if(!channel) return message.reply("Please mention a channel")

        

        }
}