const { MessageEmbed } = require("discord.js");
const db = require("quick.db")

module.exports = {

    name: "roleremove",
    description: "Removes a role from a member",
    category: "moderation",
    usage: "removerole <@user mention/id> <role mention/role id>",
    aliases: ["rr" , "roler"],
 
  run: async (client, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You dont have the permissions to remove roles")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.reply("Please mention a user")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.reply("Please provide a role to remove") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.reply("I Dont Have The Permissions To Remove Roles! - [MANAGE_ROLES]")

    if(!rMember.roles.cache.has(role.id)) {
        
      return message.reply(`\`${rMember.displayName}\` does not have this role`)
    
    } else {
        
      await rMember.roles.remove(role.id).catch(e => console.log(e.message))

      const embed = new MessageEmbed()
      .setTitle("Remove Role")
      .setDescription(`Successfully removed \`${rMember.displayName}\` the role \`${role.name}\``)
      .setColor("RED")
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      
      message.channel.send(embed)

      let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed1 = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(rMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Role Remove")
                .addField("User", rMember.user.tag)
                .addField("User ID", `${rMember.id}`)
                .addField("Role Removed By", message.author.tag)
                .addField("Role", `${role.name}`)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed1)
    
    }

  },
};