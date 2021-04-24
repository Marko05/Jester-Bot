const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "trash",
  description: "Put someone in the trash bin",
  category: "fun",
  usage: "trash <@user>",

  run: async (client , message , args) => {

const user = message.mentions.users.first() || message.author

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.trash(avatar)

  let triggered = new Discord.MessageAttachment(image, "trash.png")

  message.channel.send(triggered);
  }
}