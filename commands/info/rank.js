const Levels = require("discord-xp");
const canvacord = require("canvacord");
const Discord = require("discord.js");

module.exports = {
    name: "rank",
    category: "leveling",
    description: "Shows the rank of a user",
    usage: "rank [@user]",
    guildOnly: true,

    run: async (client, message, args) => {
        const target = message.mentions.users.first() || message.author;

        const user = await Levels.fetch(target.id, message.guild.id);

        const neededXP = Levels.xpFor(parseInt(user.level) + 1);

        if(!user) return message.channel.send("No xp, send some messages")

        const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRequiredXP(neededXP)
        .setStatus(message.member.presence.status)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(target.username)
        .setDiscriminator(target.discriminator);

        rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
        });
    }
}