const { MessageEmbed } = require("discord.js");
const ms = require("ms")
 
module.exports = {
    name: "hack",
    description: "Hack someones discord account",
    category: "fun",
    usage: "hack <@user>",
    run: async (client, message, args) => {

        const user = message.mentions.users.first()
        if(!user) return message.reply("Please provide a user")
 
        var passwords = [
            "randompass",
            "lovely123",
            "piglover1"
        ]
        const password = passwords[Math.floor(Math.random() * passwords.length )];
 
        var emails = [
            "ilike002bot@yahoo.com",
            "iamgay@gmail.com",
            "ilikepigs@gmx.com"
        ]
        const email = emails[Math.floor(Math.random() * emails.length )];
 
        var nitros = [
            "jdauJS8KSÖPiK9",
            "pwi(kssa9lIOPs"
        ]
        const nitro = nitros[Math.floor(Math.random() * nitros.length )];
 
        let loading = ":gear:"
        let done = ":white_check_mark:"
      
 
        let hack = message.mentions.users.first() || message.guild.members.cache.random().user;
        let twofa = Math.floor(Math.random(111111)*999999)
 
        let msg = await message.channel.send(`Started hacking ${hack}...`)
        msg.channel.startTyping()
        var time = "3s"
        setTimeout(function(){
           msg.edit(`${loading} Account details found:
    Email: ** ${email} **
    Passwort: ** ${password} **
           `)
        }, ms(time))
        var time1 = "6s"
        setTimeout(function(){
            msg.edit(`${loading} Generated new 2fa code: **${twofa}**`)
        }, ms(time1))
        var time2 = "9s"
        setTimeout(function(){
            msg.edit(`${loading} Logging successful`)
        }, ms(time2))
        var time3 = "12s"
        setTimeout(function(){
            msg.edit(`${loading} Found Nitro gift: ** ${nitro} **`)
        }, ms(time3))
        var time4 = "15s"
        setTimeout(function(){
            msg.edit(`${loading} Claimed all the Nitro`)
        }, ms(time4))
        var time5 = "18s"
        setTimeout(function(){
            msg.edit(`${loading} Hacked the main frame`)
            msg.channel.stopTyping()
        }, ms(time5))
        var time6 = "21s"
        setTimeout(function(){
            msg.edit(`${done} Account hack successful`)
        }, ms(time6))
    }
}