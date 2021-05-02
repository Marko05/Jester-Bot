const { hangman } = require("reconlx")

module.exports = {
    name : 'hangman',
    category: "fun",
    description: "Play some Hangman",
    usage: "hangman <#channel> <word>",
    aliases: ["hm"],

    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('You dont have permissions to use this command! - [MANAGE_MESSAGES]')
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.reply('Please mention a channel')
        const word = args.slice(1).join(" ")
        if(!word) return  message.reply('Please specify a word to guess')

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
}