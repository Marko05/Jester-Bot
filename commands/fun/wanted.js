const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "wanted",
  description: "Wanted you or someone",
  category: "fun",
  usage: "wanted <@user>",

  run: async (client , message , args) => {


const user = message.mentions.users.first() || message.author

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.wanted(avatar)

  let triggered = new Discord.MessageAttachment(image, "wanted.png")

  message.channel.send(triggered);
  }
}