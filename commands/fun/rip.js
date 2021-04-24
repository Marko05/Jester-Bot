const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "rip",
  description: "rip your or someone",
  category: "fun",
  usage: "rip <@user>",

  run: async (client , message , args) => {


const user = message.mentions.users.first() || message.author

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.rip(avatar)

  let triggered = new Discord.MessageAttachment(image, "rip.png")

  message.channel.send(triggered);
  }
}