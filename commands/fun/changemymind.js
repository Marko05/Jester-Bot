const Discord = require("discord.js")
const canvacord = require("canvacord")

module.exports = {
  name: "changemymind",
  description: "Change your mind",
  category: "fun",
  usage: "changemymind <text>",
  aliases: ["cmm"],

  run: async (client , message , args) => {


  let text = args.join(" ");

  if(!text) return message.reply('Please provide a text');

  let image = await canvacord.Canvas.changemymind(text);

  let changeMyMind = new Discord.MessageAttachment(image, "cmm.png")

  message.channel.send(changeMyMind)
  }
}