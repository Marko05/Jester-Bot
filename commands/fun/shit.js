const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "shit",
  description: "Shit on someone",
  category: "fun",
  usage: "shit <@user>",

  run: async (client , message , args) => {

const user = message.mentions.users.first() || message.author

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.shit(avatar)

  let triggered = new Discord.MessageAttachment(image, "shit.png")

  message.channel.send(triggered);
  }
}