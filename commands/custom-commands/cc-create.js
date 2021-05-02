const schema = require('../../models/custom-commands');

module.exports = {
    name: 'cc-create',
    category: 'custom-commands',
    description: "Creates a custom command",
    usage: 'create <command name> <command response>',
    aliases: ["cc-c"],

    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Do Not Have The Required Permissions! - [ADMINISTRATOR]');

        const name = args [0]
        const response = args.slice(1).join(" ");

        if(!name) return message.reply('Please provide a command name (small letters)');
        if(!response) return message.reply('Please specify the response');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.reply('Command already exists');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Saved \`${name}\` as a custom command!`);
    }
}
