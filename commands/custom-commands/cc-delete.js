const schema = require('../../models/custom-commands');

module.exports = {
    name: 'cc-delete',
    category: 'custom-commands',
    description: "Deletes a custom command",
    usage: 'delete <command name> <command response>',
    aliases: ["cc-d"],

    run: async(client, message, args) => {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Do Not Have The Required Permissions! - [ADMINISTRATOR]');

        const name = args[0];

        if(!name) return message.reply('Please provide a command name');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.reply('That command does not exist!');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.reply(`Removed \`${name}\` from custom commands!`);
    }
}