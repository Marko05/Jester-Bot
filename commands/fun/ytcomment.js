const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "ytcomment",
  description: "Writes an comment in youtube",
  category: "fun",
  usage: "ytcomment <message>",
  aliases: ["ytc"],

  run: async (client , message , args) => {


const user = message.author
const username = user.username

let msg = args.slice(0).join(" ")
if(!msg) return message.reply("Please specify an message")

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.youtube(ops = { username: username, content: msg, avatar: avatar , dark: false })

  let triggered = new Discord.MessageAttachment(image, "youtube.png")

  message.channel.send(triggered);
  }
}