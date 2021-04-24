const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "bug",
  description: "Report an Bug",
  category: "utility",
  usage: "bug <bug>",

  run: async (client , message, args) => { 
  const channel = client.channels.cache.get('828321465694421022');

    const query = args.join(' ');
    if (!query) return message.reply('Specify the bug');

    const reportEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle('New Bug')
      .addField('Author', message.author.toString(), true)
      .addField('Guild', message.guild.name, true)
      .addField('Report', query)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();
    channel.send(reportEmbed);

    message.reply('Bug report has been sent.');
  }
}
