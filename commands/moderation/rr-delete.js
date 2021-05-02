const ReactionModel = require("../../models/ReactionRole");
const { Message, Client, MessageEmbed } = require("discord.js");
module.exports = {
  name: "rr-delete",
  description: "Delete a reaction role",
  category: "reaction-roles",
  usage: "rr-delete <Message ID> <Role ID>",
  aliases: ["del"],

  run: async (client, message, args) => {

     if (!message.member.permissions.has("ADMINISTRATOR"))
return message.reply(`You do not have permissions! - [ADMINISTRATOR]`);

      if (!args[0])
      return message.reply(
        `Please provide the Message ID`
      );

      if (!message.guild.roles.cache.has(args[1]))
      return message.reply(`Role does not exist`);
    
    ReactionModel.findOne(
      { MessageID: args[0], Guild: message.guild.id },
      async (err, data) => {
        if (err) throw err;
        if (!data)
          return message.reply(`That is not a recation role message`);
        ReactionModel.findOneAndDelete(
          { MessageID: args[0], Guild: message.guild.id },
          (err) => {
            if (err) throw err;
          }
        );
        return message.reply(`Successfully deleted the Reaction Role`);
      }
    );
  },
};