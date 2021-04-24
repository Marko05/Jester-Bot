const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "phub",
  description: "Writes an comment in p*rnhub",
  category: "fun",
  usage: "phub <message>",

  run: async (client , message , args) => {


const user = message.author
const username = user.username

let msg = args.slice(0).join(" ")
if(!msg) return message.reply("Please specify an message")

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.phub(options = { username: username, message: msg, image: avatar })

  let triggered = new Discord.MessageAttachment(image, "phub.png")

  message.channel.send(triggered);
  }
}