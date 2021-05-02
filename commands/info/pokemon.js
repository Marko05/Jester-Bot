const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
const phin = require('phin')

module.exports = {
    name: "pokemon",
    category: "fun",
    description: "Gives informations about a pokemon",
    usage: `pokemon <pokemon>`,
    aliases: ["poke"],
    
    run: async (client, message, args) => {

    if(!args.length) return message.reply('Please specify an pokemon')  
    const text = args.slice(0).join(" ").toLowerCase();

    let embed;

    const data = await phin({ 
url: `https://some-random-api.ml/pokedex?pokemon=${text}`,
parse: 'json',
method: 'get'
})
//if(!data) return message.channel.send(':x: | Could not find that pokemon.')
.then(res => {
     
     embed = new MessageEmbed()
    .setAuthor(`${res.body.name}` , res.body.sprites.normal)
    .setThumbnail(res.body.sprites.animated)
    .setDescription(res.body.description)
    .addField(`General Informations` , `Type: **${res.body.type}**\nSpecies: **${res.body.species}**\nAbilities: **${res.body.abilities}**\nHeight: **${res.body.height}**\nWeight: **${res.body.weight}**\nGender: **${res.body.gender}**\nEgg Groups: **${res.body.egg_groups}**` , true)
    .addField(`Stats` , `HP: **${res.body.stats.hp}**\nAttack: **${res.body.stats.attack}**\nDefense: **${res.body.stats.defense}\n**SP Attack: **${res.body.stats.sp_atk}**\nSP Defense: **${res.body.stats.sp_def}**\nSpeed: **${res.body.stats.speed}**\nTotal: **${res.body.stats.total}**` , true)
    .setColor("RED")
    .setTimestamp()
    .setFooter(`Requested By: ${message.author.tag}` , message.author.displayAvatarURL({dynamic: true}))

    message.channel.send(embed)
    })
        
    }
}