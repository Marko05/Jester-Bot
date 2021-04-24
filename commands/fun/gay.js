const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "gay",
  description: "Puts someones Avatar in the LQBTQ Flag",
  category: "fun",
  usage: "rainbow <@user>",

  run: async (client , message , args) => {

const user = message.mentions.users.first() || message.author

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.rainbow(avatar)

  let triggered = new Discord.MessageAttachment(image, "rainbow.png")

  message.channel.send(triggered);
  }
}