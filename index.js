const Discord = require('discord.js');
const client = new Discord.Client();
const { token , mongooseString , prefix} = require('./config.json');
const fs = require("fs");
require("dotenv").config();
const mongoose = require("mongoose");
const Levels = require("discord-xp");
const Guild = require("./models/guild");
const eco = require("./models/economy");
const mongoCurrency = require('discord-mongo-currency')
client.queue = new Map();


const keepAlive = require('./server');

keepAlive();

const ebal = (guild, guildName, user) => new Promise(async ful => {
  const data = await eco.findOne({ guild, guildName, user})

  if(!data) return ful(0);
  return ful(data.coins)
})

const eadd = (guild, guildName, user, coins) => {
  eco.findOne({ guild, guildName, user}, async(err, data) => {
    if(!data) {
      data = new eco({ guild, guildName, user, coins })
    } else {
      data.coins += coins;
    }
    data.save();
  })
} 

const ermv = (guild, guildName, user, coins) => {
  eco.findOne({ guild, guildName, user}, async(err, data) => {
    if(!data) {
      data = new eco({ guild, guildName, user, coins: -coins })
    } else {
      data.coins -= coins;
    }
    data.save();
  })
} 

mongoCurrency.connect('mongodb+srv://Jesterbot:jester@cluster0.5fkby.mongodb.net/test')




client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.snipes = new Discord.Collection()
client.aliases = new Discord.Collection()


Levels.setURL(mongooseString);

mongoose.connect(mongooseString, {
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(console.log("Connected to db"));

//event handler

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

//command handler

client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply("I can't execute this command into dm's!");
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You don\'t have permission!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nProper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Wait ${timeLeft.toFixed(1)} more seconds before executing this command: \`${command.name}\``);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.run(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute this command!');
	}
});

     
client.on("message", async (message) => {
 
  if (!message.guild) return;
        if (message.author.bot) return;
        const randomXp = Math.floor(Math.random() * 7) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
        if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`GG ${message.author}! You leveled up to Level \`${user.level}\`! Keep it going!`);
        }

});

client.on("guildCreate" , guild => {
  let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
      if(channel.type == "text" && defaultChannel == "") {
        if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
          defaultChannel = channel;
        }
      }
  })
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Thanks for adding me to your server!` , guild.iconURL({dynamic: true}))
  .setDescription(`Hey There! I am Jester. Your personal Discord Bot with lots of cool and helpful functions! Now I am going to show you my 6 categorys\n\n❯ Moderation\n❯ Economy\n❯ Music\n❯ Fun\n❯ Info\n❯ Utility\n\nTo get started, type \`>>help\`\n\nI wish you a lot of fun with me!`)
  .setColor("RED")
  .setThumbnail(client.user.displayAvatarURL())
  .setTimestamp()
  .setFooter(guild.name , guild.iconURL({dynamic: true}))

  defaultChannel.send(embed)
})

client.login(token)