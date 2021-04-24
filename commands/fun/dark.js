const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "dark",
  description: "Dark your avatar",
  category: "fun",
  usage: "dark <@user>",

  run: async (client , message , args) => {

const user = message.author

const number = args [0]
if(!number) return message.reply("Please specify, how much should the image should be dark")
if(isNaN(args[0])) return message.reply("Thats not a number")

  let avatar = user.displayAvatarURL({dynamic: true, format: "png"});

  let image = await canvacord.Canvas.darkness(avatar , number)

  let triggered = new Discord.MessageAttachment(image, "dark.png")

  message.channel.send(triggered);
  }
}