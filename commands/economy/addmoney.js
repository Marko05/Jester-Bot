const Discord = require("discord.js")
const db  = require("quick.db")
module.exports = {
    name: "addmoney",
    category: "economy",
    description: "Add Money To Someone",
    usage: `addmoney <@user> <amount>`,
    
    run: async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You dont have permissions to use this command - [ADMINISTRATOR]")

let user = message.mentions.users.first()
if(!user) return message.reply("Please provide a user")

let amount = args.slice(1).join(" ")
if(!amount) return message.reply("Please enter an amount to add")

if(isNaN(amount))
return message.reply("Please provide a real number")


let embed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("Addmoney")
.setDescription(`Successfully added \`${amount}\` to ${user}`)
.setThumbnail(client.user.displayAvatarURL())
.setTimestamp()

message.channel.send(embed)
db.add(`money_${user.id}`, amount);
}
}