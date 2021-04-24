const { MessageEmbed } = require("discord.js")
const dateformat = require("dateformat")

module.exports = {

    name: "serverinfo",
    category: "info",
    description: "Info of a Server",
    usage: "serverinfo",

    run: async (bot, message, args) => {

let region = {
    "brazil": "Brazil",
    "europe": "Europe",
    "singapore": "Singapore",
    "london": "London",
    "russia": "Russia",
    "japan": "Japan",
    "hongkong": "Hongkong",
    "sydney": "Sydney",
    "us-central": "U.S. Central",
    "us-east": "U.S. East",
    "us-south": "U.S. South",
    "us-west": "U.S. West",
    "eu-west": "Western Europe"
  }
  
  
  let member = message.guild.members;
  let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
      online = member.cache.filter(m => m.user.presence.status === "online").size,
      idle = member.cache.filter(m => m.user.presence.status === "idle").size,
      dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
      robot = member.cache.filter(m => m.user.bot).size,
      total = message.guild.memberCount;
  
  
  let channels = message.guild.channels;
  let text = channels.cache.filter(r => r.type === "text").size,
      vc = channels.cache.filter(r => r.type === "voice").size,
      category = channels.cache.filter(r => r.type === "category").size,
      totalchan = channels.cache.size;
  
  
  let location = region[message.guild.region];
  
  
  let x = Date.now() - message.guild.createdAt;
  let h = Math.floor(x / 86400000)
  let created = dateformat(message.guild.createdAt); 
  
  const embed = new MessageEmbed()
  .setColor("RED")
  .setTimestamp(new Date())
  .setThumbnail(message.guild.iconURL())
  .setAuthor(message.guild.name, message.guild.iconURL())
  .setDescription(`**Server-ID:** ${message.guild.id}`)
  .addField("Region", location)
  .addField("Date Created", `${created} \nsince **${h}** day(s)`)
  .addField("Owner", `${message.guild.owner.user.tag}`)
  .addField(`Members [${total}]`, `Online: ${online} \nIdle: ${idle} \nDND: ${dnd} \nOffline: ${offline} \nBots: ${robot}`)
  .addField(`Channels [${totalchan}]`, `Text: ${text} \nVoice: ${vc} \nCategory: ${category}`)
  .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())
  message.channel.send(embed);
  
  }
}