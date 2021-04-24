const { MessageEmbed } = require("discord.js")
const api = require("imageapi.js")

module.exports = {
    name: "meme",
    category: "fun",
    description: "Shows a random meme",
    usage: `meme`,
    
    run: async (bot, message, args) => {

        let subreddits = ["dankmeme", "meme", "memes"];
        let subreddit =
          subreddits[Math.floor(Math.random() * subreddits.length - 1)];
        let img = await api(subreddit);
        const Embed = new MessageEmbed()
          .setTitle(`Meme :joy:`)
          .setURL(`https://reddit.com/r/${subreddit}`)
          .setColor("PURPLE")
          .setImage(img)
          .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(Embed);
        }
    }