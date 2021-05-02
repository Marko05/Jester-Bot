const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "delete",
  description: "Delete someone",
  category: "fun",
  usage: "delete <@user>",

  run: async (client , message , args) => {

const user = message.mentions.users.first() || message.author

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.delete(avatar , message)

  let triggered = new Discord.MessageAttachment(image, "delete.png")

  message.channel.send(triggered);
  }
}