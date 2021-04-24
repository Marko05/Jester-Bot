const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
  name: "clear",
  category: "moderation",
  description: "Clears an amount of messages",
  usage: "clear <messages [1-100]>",

  run: async (client, message, args) => {

    if (message.member.hasPermission('MANAGE_MESSAGES')) {
      if (!args[0])
        return message.reply('Specify the amount of messages to clear.');
      if (isNaN(args[0]))
        return message.reply('Specify a **real** number.');

      if (args[0] > 100)
        return message.reply(
          'You cannot delete more than 100 messages.'
        );
      if (args[0] < 1)
        return message.reply('You must delete at least 1 message.');

      let deleteAmount;

      if (parseInt(args[0]) > 1000) {
        deleteAmount = 1000;
      } else {
        deleteAmount = parseInt(args[0]);
      }

      message.channel
        .bulkDelete(deleteAmount, true)
        .then((deleted) =>
          message.channel
            .send(`Deleted \`${deleted.size}\` messages`)
            .then((m) => m.delete({ timeout: 5000 }))
        );
    } else {
      return;
    }

  }}

