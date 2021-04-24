const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "trigger",
  description: "Triggers you or a user",
  category: "fun",
  usage: "trigger <@user>",

  run: async (client , message , args) => {

  const user = message.mentions.users.first() || message.author

  let avatar = user.displayAvatarURL({dynamic: false, format: "png"});

  let image = await canvacord.Canvas.trigger(avatar)

  let triggered = new Discord.MessageAttachment(image, "triggered.gif")

  message.channel.send(triggered);
  }
}