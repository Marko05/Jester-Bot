const ms = require("parse-ms")
const { MessageEmbed } = require("discord.js")
const ebal = (guild, guildName, user) => new Promise(async ful => {
  const data = await eco.findOne({ guild, guildName, user})

  if(!data) return ful(0);
  return ful(data.coins)
})

module.exports = {
    name: "work",
    category: "economy",
    description: "Work to make money",
    usage: `work`,
    
    
    run: async (client, message, args) => {


}
}

