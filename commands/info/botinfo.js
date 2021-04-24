const { MessageEmbed } = require('discord.js');
const os = require("os")
const ms = require("ms")
const utc = require("moment")


module.exports = {
    name: "botinfo",
    category: "info",
    description: "Get some bot informations",
    usage: "botinfo",

run:  async (client, message, args) => {

  let core = os.cpus()[0]

  const embed = new MessageEmbed()
  .setTitle('Botinfo')
  .setColor("RED")
  .setThumbnail(client.user.displayAvatarURL())
  .addField('Servers' , client.guilds.cache.size.toLocaleString())
  .addField('Users' , client.users.cache.size.toLocaleString())
  .addField("API Latency", `${(client.ws.ping)}ms`)  
  .addField(`Commands` , client.commands.size , true)
  .addField('Node.js' , process.version , true)
  .addField('Langauge' , `[discord.js](https://discord.js.org/#/)` , true)
  .addField('Uptime' , ms(os.uptime() * 1000 , { long: true}) , true)
  .addField('CPU Cores' , os.cpus().length , true)
  .addField('CPU Model' , core.model , true)
  .addField('CPU Speed' , `${core.speed} MHz` , true)
  .addField("Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
  .setTimestamp()
  .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL())

  message.channel.send(embed)
}
}
