const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "facepalm",
  description: "Facepalm someone",
  category: "fun",
  usage: "facepalm <@user>",
  aliases: ["fp"],

  run: async (client , message , args) => {


const user = message.author

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.facepalm(avatar)

  let triggered = new Discord.MessageAttachment(image, "fm.png")

  message.channel.send(triggered);
  }
}