const Discord = require("discord.js")

module.exports = {
  name: "test",
  description: "Test Command",
  category: "test",

  run: async (client , message, args) => {

    message.channel.send("Test Command works.")
  }
}