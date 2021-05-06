const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "suggest",
  description: "Suggest something in your server",
  category: "utility",
  usage: "suggest <suggestion>",

  run: async (client , message, args) => {
  
  const channel = message.guild.channels.cache.find(
      (c) => c.name === 'suggestions'
    );
    if (!channel)
      return message.reply('Suggestions channel does not exist. Please make a channel called \`suggestions\`.');

    let messageArgs = args.join(' ');
    if (!messageArgs) return message.reply('Specify a suggestion.');

    const embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(messageArgs);
    channel
      .send(embed)
      .then((msg) => {
        msg.react('✅');
        msg.react('❌');
        message.delete();
      })
      .catch((e) => {
        throw err;
      });
  }
}

