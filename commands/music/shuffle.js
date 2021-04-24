const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shuffle",
  description: "Shuffles the queue",
  category: "music",
  usage: "shuffle",

  run: async (client, message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must join a voice channel"
    );
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.reply("No Songs in queue to shuffle")
  let songs = queue.queue;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.queue = songs;
  message.client.queue.set(message.guild.id, queue);
  message.channel
    .send(
      new MessageEmbed()
        .setAuthor(
          "Shuffle",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("Successfully \`shuffled\` the queue")
        .setColor("RED")
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Requested By ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
    )
    .catch(console.error);
}
}