const ReactionModel = require("../../models/ReactionRole");
const { Message, Client, MessageEmbed } = require("discord.js");
module.exports = {
  name: "rr-add",
  description: "Add a reaction role",
  category: "reactionroles",
  usage: "rr-add <Channel ID> <Role ID> <Emoji>",

  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.reply(`You do not have permissions! - [ADMINISTRATOR]`);
    if (!args[0])
      return message.reply(`Please provide a Channel ID.`);
    if (!args[1])
      return message.reply(`Please provide a Role ID`);
    if (!args[2])
      return message.reply(`Please provide an emoji`);
    function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }
    if (!message.guild.roles.cache.has(args[1]))
      return message.reply(`Role does not exist`);
    if (isCustomEmoji(args[2]))
      return message.reply(`Thats a custom emoji`);
    let ch = message.guild.channels.cache.get(args[0]);
    if (!ch)
      return message.reply(`Channel does not exist`);
    const msg = await ch.send(
      new MessageEmbed({
        title: `Reaction Role`,
        timestamp: Date.now(),
        description: `
            ${args[2]} - ${message.guild.roles.cache.get(args[1])}
            `.trim(),
        color: `GREEN`,
        thumbnail: `${client.user.displayAvatarURL()}`
      })
    );
    await msg.react(args[2]);
    const newData = new ReactionModel({
      Guild: message.guild.id,
      Reaction: args[2],
      MessageID: msg.id,
      Role: args[1],
    });
    newData.save();
  },
};