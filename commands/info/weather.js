const { MessageEmbed } = require("discord.js")
const weather = require("weather-js")

module.exports = {
    name: "weather",
    category: "info",
    description: "Shows the weather of a city",
    usage: "weather <city>",
    run: async(client, message, args) => {

    const city = args.slice(0).join(" ")
    if(!city) return message.reply("Please enter a city")

    weather.find({search: city, degreeType: "C"}, function (err, result) {
        if(err) return message.reply("Cannot get weather data of given location")

    const embed = new MessageEmbed()
    .setTitle(`Weather Forecast of ${result[0].location.name}`)
    .setDescription(`\`${result[0].current.skytext}\``)
    .setColor("RED")
    .setThumbnail(result[0].current.imageUrl)
    .addField(`Temperature:` , `${result[0].current.temperature}°C` , true)
    .addField(`Feels Like:` , `${result[0].current.feelslike}°C` , true)
    .addField(`Humidity:` , `${result[0].current.humidity}` , true)
    .addField(`Wind:` , `${result[0].current.winddisplay}` , true)
    .addField(`Observation Time:` , `${result[0].current.observationtime}` , true)

    message.channel.send(embed)
    
    })
}
}