const { MessageEmbed } = require("discord.js")


module.exports = { 
    name: "help", 
    category: "utility",
    description: "Shows you the help command",
    usage: "help",
    aliases: ["h"],
    
    run: async (client, message, args) => {    

    let hiArray = message.content.split(" ");
    let hiArgs = hiArray.slice(1);

    if(!hiArgs[0]) {

    var embed = new MessageEmbed()
    .setAuthor(`Help has arrived, ${message.author.username}` , message.author.displayAvatarURL({dynamic: true}))
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RED")
    .setDescription(`For additional informations on a command, use \`>>help <command>\``)
    .addField(`⚒ Moderation [18]` , `\`ban\` | \`kick\` | \`unban\` | \`mute\` | \`unmute\` | \`rr-add\` | \`rr-delete\` | \`lock\` | \`lockchannel\` | \`unlockchannel\` | \`roleadd\` | \`roleremove\` | \`channel-create\` | \`channel-delete\` | \`slowmode\` | \`poll\` |  \`clear\` | \`setnick\``)
    .addField(`💰 Economy [12]` , `\`balance\` | \`addmoney\` | \`removemoney\` | \`beg\` | \`buy\` | \`shop\` | \`daily\` | \`weekly\` | \`fish\` | \`hunt\` | \`mine\` | \`work\``)
    .addField(`🎶 Music [13]` , `\`play\` | \`queue\` | \`np\` | \`loop\` | \`pause\` | \`resume\` | \`remove\` | \`skip\` | \`stop\` | \`skipto\` | \`volume\` | \`shuffle\` | \`lyrics\``)
    .addField(`:globe_with_meridians: Custom Commands [3]` , `\`cc-create\` | \`cc-delete\` | \`cc-list\``)
    .addField(`:joy: Fun [34]` , `\`8ball\` | \`hangman\` | \`tictactoe\` | \`chatbot\` | \`snake\` | \`cat\` | \`cuddle\` | \`dog\` | \`feed\` | \`hug\` | \`kiss\` | \`owo\` | \`pat\` | \`slap\` | \`smug\` | \`meme\` | \`hack\` | \`spoiler\` | \`tickle\` | \`waifu\` | \`ytcomment\` | \`tweet\` | \`changemymind\` | \`dark\` | \`delete\` |  \`phub\` | \`facepalm\` | \`gay\` | \`rip\` | \`shit\` | \`trash\` | \`wanted\` | \`wasted\` | \`trigger\``)
    .addField(`🔗 Info [11]` , `\`rank\` | \`leaderboard\` | \`weather\` | \`animesearch\` | \`urban\` | \`fact\` | \`covid\` | \`pokemon\` | \`botinfo\` | \`userinfo\` |  \`serverinfo\``)
    .addField(`⚙️ Utility [7]` , `\`help\` | \`setlogchannel\` | \`disablelogchannel\` | \`suggest\` | \`bug\` | \`remind\` | \`avatar\``)
    .addField(`Links` , `[Invite](https://discord.com/api/oauth2/authorize?client_id=828262455767203842&permissions=8&scope=bot) | [Support Server](https://discord.gg/mzNAPvTUbN) | [Void Bots](https://voidbots.net/bot/828262455767203842/)`)
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()

    message.channel.send(embed)

    }

    if(hiArgs[0]) {

    var command = hiArgs[0];

    const commandObject = client.commands.get(command)

    if(client.commands.has(command)) {
 
    var embed1 = new MessageEmbed()
    .setTitle(`Info for the Command ${commandObject.name}`)
    .setDescription(`**Category:** \`${commandObject.category}\`\n**Description:** \`${commandObject.description}\`\n**Usage:** \`${commandObject.usage}\`\n**Aliases:** \`${commandObject.aliases || "No Aliases"}\``)
    .setColor("RED")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`Requested by: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()

    message.channel.send(embed1)

	} else {
				message.reply('That command does not exist.');
  }
}}
}