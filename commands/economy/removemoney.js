const Discord = require("discord.js")
const db  = require("quick.db")
module.exports = {
    name: "removemoney",
    category: "economy",
    description: "Removes Money From Someone",
    usage: `removemoney <@user> <amount>`,
    
    run: async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You dont have permissions to use this command - [ADMINISTRATOR]")

let user = message.mentions.users.first()
if(!user) return message.reply("Please provide a user")

let amount = args.slice(1).join(" ")
if(!amount) return message.reply("Please enter an amount to remove")

if(isNaN(amount))
return message.reply("Please provide a real number")


let embed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("Removemoney")
.setDescription(`Successfully removed \`${amount}\` from ${user}`)
.setThumbnail(client.user.displayAvatarURL())
.setTimestamp()

message.channel.send(embed)
db.subtract(`money_${user.id}`, amount);
}
}