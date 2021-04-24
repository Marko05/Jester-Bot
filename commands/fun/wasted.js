const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "wasted",
  description: "Wasted you or someone",
  category: "fun",
  usage: "wasted <@user>",

  run: async (client , message , args) => {


const user = message.mentions.users.first() || message.author

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.wasted(avatar)

  let triggered = new Discord.MessageAttachment(image, "wasted.png")

  message.channel.send(triggered);
  }
}