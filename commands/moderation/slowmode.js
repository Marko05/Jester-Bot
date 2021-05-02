const { MessageEmbed } = require("discord.js")
const ms = require("ms")

module.exports = {
  name: "slowmode",
  category: "moderation",
  description: "Slowmodes a channel",
  usage: "slowmode <#channel> <time s/m/h> | slowmode <#channel> off",
  aliases: ["sm"],

  run: async (client, message, args) => {

  if (!message.member.hasPermission(["MANAGE_CHANNELS"])) {
    return message.reply("You cannot use this command")
  }
  
  let channel = message.mentions.channels.first()
  let time = args.slice(1).join(" ");
  
  if (!channel) 
  return message.reply("Please mention a channel")
   
  if (time.toLowerCase() === "off") {
    channel.setRateLimitPerUser(0);
    return message.reply(`<#${channel.id}> slowmode has been deactivated.`);
  }
  
  if (!time) return message.reply("Please provide a time");
  if (time.toLowerCase() == "off") time = "0s"
  let convert = ms(time);
  let toSecond = Math.floor(convert / 1000);
  
  if (!toSecond || toSecond == undefined) return message.reply("Please insert a valid time format");
  
  if (toSecond > 21600) return message.reply("The Time has to be 6 hours or less");
  else if (toSecond < 1) return message.reply("The Time has to be more than 1 second");
  
  await channel.setRateLimitPerUser(toSecond);

  const embed = new MessageEmbed()
  .setTitle("Slowmode")
  .addField("Channel" , channel)
  .addField("Time" , `${ms(ms(time), {long: true})}`)
  .addField("Slowmoded By" , message.author)
  .setColor("GREEN")
  .setTimestamp()

  message.channel.send(embed)

  }
}