const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "changemymind",
  description: "Change your mind",
  category: "fun",
  usage: "changemymind <text>",

  run: async (client , message , args) => {


  let text = args.join(" ");

  if(!args[0]) return message.channel.send('Provide a valid HEX code (#FF0000)');

  let image = await canvacord.Canvas.changemymind(text);

  let changeMyMind = new Discord.MessageAttachment(image, "cmm.png")

  message.channel.send(changeMyMind)
  }
}