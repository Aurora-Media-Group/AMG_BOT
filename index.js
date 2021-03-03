const { Client, Collection, MessageEmbed } = require('discord.js');
const { prefix } = require('./config.json');
const client = new Client({ disableMentions: 'everyone' });


const fs = require('fs');
const command = require('./handlers/command');

var token = process.env.TOKEN;
client.commands = new Collection();
client.aliases = new Collection();
client.ticketCategory = 816328167626768406
client.categories = fs.readdirSync('./commands/');

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
client.on('ready', () => {
	console.log('Bot is ready');
});

client.on('message', async message => {
	if (!message.guild) {
		let args = message.content.trim().split(/ +/g);
		let msg = args.join(' ');
		client.channels.fetch('709551785261400095', false).then(channel => {
			let fembed = new MessageEmbed()
				.setTitle('New Direct Message')
				.setColor('#0477C2')
				.addFields(
					{
						name: '***User Name:***',
						value: `User tag: ${message.author.tag}\nUser Id: ${
							message.author.id
						}`
					},
					{ name: '***Message:***', value: `${msg}` }
				);
			channel.send(fembed);
		});
	}
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.guild) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message);
	let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	let cmd = args.shift().toLocaleLowerCase();
	if (cmd.length == 0) return;
	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) command.run(client, message, args);
});

client.on('ready', () => {
	client.user
		.setActivity('www.auroramediagroup.xyz')

		.then(Presence =>
			console.log(`Activity set to ${Presence.activities[0].name}`)
		)

		.catch(console.error);
});

client.on(`message`, message => {
	let args = message.content.substring(prefix.length).split(' ');

	if (message.content.startsWith(`${prefix}avatar`)) {
		client.commands.get('avatar').execute(message, args);
	}
});

client.on('guildBanAdd', async (guild, user) => {
	console.log(`${user.tag} got rekt from ${guild.name}.`);
});

client.on('guildMemberAdd', async (member) => {

  if (member.guild.id == 478952313562595329) {
	  member.guild.systemChannel.send(`Welcome ${member} to Aurora Media Group 

If you are looking to join the group then check <#661719364323770438> for information. 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Check out <#553998205696606218> to get your Custom Roles!
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
By using this server you agree to the Terms of Service outlined in the <#661168031271223306>

Have Fun`);
  } else if (member.guild.id === 782219245391314954) {
    member.guild.systemChannel.send(`Welcome ${member}`)
  }
});

client.on('guildMemberRemove', async (member) => {

	member.guild.systemChannel.send(`Goodbye ${member}.We hope you come back.`);
});

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', reason.stack || reason);
	return;
});

client.login(token);
