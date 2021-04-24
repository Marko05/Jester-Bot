const Levels = require("discord-xp");
const Discord = require("discord.js");
const { execute } = require("./rank");
const client = new Discord.Client();

module.exports = {
    name: "leaderboard",
    category: "leveling",
    description: "Shows the ranks leaderboard",
    usage: "leaderboard",
    guildOnly: true,

    run: async (client, message , args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); 

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); 

        const lb = leaderboard.map(e => `***${e.position}. ${e.username}#${e.discriminator}***\n**Level:** \`${e.level}\`\n**XP:** \`${e.xp.toLocaleString()}\``);

        const lbEmbed = new Discord.MessageEmbed()
        .setTitle("Leaderboard")
        .setDescription(lb.join("\n\n"))
        .setColor("RED")
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        message.channel.send(lbEmbed);
    }
}