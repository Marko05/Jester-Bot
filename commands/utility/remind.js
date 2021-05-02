const ms = require('ms');
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "remind",
  description: "Sets an reminder for you",
  category: "utility",
  usage: "remind <time s/m/h> <reason>",
  aliases: ["r"],

  run: async (client , message, args) => {


		let time = args[0];
		let user = message.author;
		let reminder = args.splice(1).join(' ');

		if (!args[0])
			return message.reply('Please specify a time');
		if (
			!args[0].endsWith('d') &&
			!args[0].endsWith('m') &&
			!args[0].endsWith('h') &&
			!args[0].endsWith('s')
		)
			return message.reply(
				'Your Time format is Incorrect. Supported: d, h, m, s.'
			);
		if (!reminder)
			return message.reply("Please specify a reason");

		/*let timeF = moment(ms(time)).format(
			'D [day(s)], k [hour(s)], m [minute(s) and] ss [second(s)]'
		);*/
		const remindertime = new MessageEmbed()
			.setTitle('Reminder Set')
			.setColor('GREEN')
			.setDescription(`Your reminder will go off in **${time}**.`);

		message.channel.send(remindertime);

		const reminderdm = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('Reminder')
			.setDescription(
				`It has been **${time}**, here is your reminder!\n\`${reminder}\``
			);

		setTimeout(async function() {
			return message.author.send(reminderdm);
		}, ms(time));
	}
}
